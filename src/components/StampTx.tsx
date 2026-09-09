import { useCallback, useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import { cookFromLamports } from '../lib/fees'
import { explorerTx } from '../lib/cookie'

/** SPL Memo program (Solana-compatible / Cookie genesis). */
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')

type LogItem = {
  at: string
  status: 'pending' | 'confirmed' | 'error'
  sig?: string
  detail: string
}

export function StampTx() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction, connected } = useWallet()
  const [busy, setBusy] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const [feeEstimate, setFeeEstimate] = useState<number | null>(null)
  const [log, setLog] = useState<LogItem[]>([])

  const push = (item: LogItem) => setLog((prev) => [item, ...prev].slice(0, 8))

  const refreshBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance(null)
      return
    }
    const lamports = await connection.getBalance(publicKey, 'confirmed')
    setBalance(lamports)
  }, [connection, publicKey])

  const estimateFee = useCallback(async () => {
    if (!publicKey) return
    const { blockhash } = await connection.getLatestBlockhash('confirmed')
    const tx = new Transaction({ feePayer: publicKey, recentBlockhash: blockhash }).add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 1,
      }),
      new TransactionInstruction({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
        programId: MEMO_PROGRAM_ID,
        data: Buffer.from('cookie-fee-desk:ping', 'utf8'),
      }),
    )
    const fee = await connection.getFeeForMessage(tx.compileMessage(), 'confirmed')
    setFeeEstimate(fee.value)
  }, [connection, publicKey])

  useEffect(() => {
    void refreshBalance()
    void estimateFee()
  }, [refreshBalance, estimateFee])

  const stamp = useCallback(async () => {
    if (!publicKey) return
    setBusy(true)
    const at = new Date().toISOString()
    push({ at, status: 'pending', detail: 'Building self-transfer + memo…' })
    try {
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed')
      const memo = `cookie-fee-desk|${Date.now()}|organic-only`
      const tx = new Transaction({ feePayer: publicKey, recentBlockhash: blockhash }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 1,
        }),
        new TransactionInstruction({
          keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
          programId: MEMO_PROGRAM_ID,
          data: Buffer.from(memo, 'utf8'),
        }),
      )

      const sig = await sendTransaction(tx, connection, { skipPreflight: false })
      push({ at, status: 'pending', sig, detail: 'Submitted — waiting for confirmation…' })

      const conf = await connection.confirmTransaction(
        { signature: sig, blockhash, lastValidBlockHeight },
        'confirmed',
      )
      if (conf.value.err) {
        push({
          at,
          status: 'error',
          sig,
          detail: `On-chain error: ${JSON.stringify(conf.value.err)}`,
        })
      } else {
        push({
          at,
          status: 'confirmed',
          sig,
          detail: `Confirmed. Memo: ${memo}`,
        })
      }
      await refreshBalance()
      await estimateFee()
    } catch (e) {
      push({
        at,
        status: 'error',
        detail: e instanceof Error ? e.message : String(e),
      })
    } finally {
      setBusy(false)
    }
  }, [connection, publicKey, sendTransaction, refreshBalance, estimateFee])

  return (
    <section className="card">
      <h2>On-chain stamp (tx)</h2>
      <p className="muted small">
        Required bounty interaction: build → sign (Nightly) → confirm on Cookie Chain with live
        status. Sends a <strong>1-lamport self-transfer</strong> plus an SPL Memo so explorers show
        activity without moving funds to a third party.
      </p>

      {!connected && <p className="warn">Connect Nightly first.</p>}

      <div className="row wrap">
        <button type="button" className="ghost" disabled={!connected || busy} onClick={() => void refreshBalance()}>
          Refresh COOK balance
        </button>
        <button type="button" className="ghost" disabled={!connected || busy} onClick={() => void estimateFee()}>
          Estimate fee
        </button>
        <button type="button" className="primary" disabled={!connected || busy} onClick={() => void stamp()}>
          {busy ? 'Signing / confirming…' : 'Stamp fee note on-chain'}
        </button>
      </div>

      <dl className="grid2 tight">
        <div>
          <dt>Wallet COOK</dt>
          <dd className="mono">
            {balance === null ? '—' : `${cookFromLamports(balance).toFixed(9)} COOK`}
          </dd>
        </div>
        <div>
          <dt>Est. fee (lamports)</dt>
          <dd className="mono">{feeEstimate === null ? '—' : feeEstimate.toLocaleString()}</dd>
        </div>
      </dl>

      <h3 className="subh">Activity</h3>
      {log.length === 0 && <p className="muted small">No stamps yet this session.</p>}
      <ul className="activity">
        {log.map((item, i) => (
          <li key={`${item.at}-${i}`} className={item.status}>
            <span className="badge">{item.status}</span>{' '}
            <span className="muted small">{item.at}</span>
            <div>{item.detail}</div>
            {item.sig && (
              <a href={explorerTx(item.sig)} target="_blank" rel="noreferrer" className="mono small">
                {item.sig.slice(0, 12)}…{item.sig.slice(-8)}
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
