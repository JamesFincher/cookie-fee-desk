import { useCallback, useEffect, useState } from 'react'
import { useConnection } from '@solana/wallet-adapter-react'
import { COOKIE_EXPLORER, COOKIE_GENESIS_HASH, COOKIE_RPC } from '../lib/cookie'

type Pulse = {
  slot: number
  version: string
  genesis: string
  health: string
  avgPriorityFee: number
}

async function rpcHealth(): Promise<string> {
  try {
    const res = await fetch(COOKIE_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getHealth' }),
    })
    const json = await res.json()
    return String(json.result ?? 'unknown')
  } catch {
    return 'unreachable'
  }
}

export function ChainPulse() {
  const { connection } = useConnection()
  const [pulse, setPulse] = useState<Pulse | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setErr(null)
      const [slot, version, genesis, fees, health] = await Promise.all([
        connection.getSlot('confirmed'),
        connection.getVersion(),
        connection.getGenesisHash(),
        connection.getRecentPrioritizationFees(),
        rpcHealth(),
      ])
      const avg =
        fees.length === 0
          ? 0
          : fees.reduce((a, f) => a + f.prioritizationFee, 0) / fees.length
      setPulse({
        slot,
        version: `${version['solana-core'] ?? 'unknown'}`,
        genesis,
        health,
        avgPriorityFee: avg,
      })
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e))
    }
  }, [connection])

  useEffect(() => {
    void refresh()
    const id = window.setInterval(() => void refresh(), 15_000)
    return () => window.clearInterval(id)
  }, [refresh])

  return (
    <section className="card">
      <div className="row">
        <h2>Cookie Chain pulse</h2>
        <button type="button" className="ghost" onClick={() => void refresh()}>
          Refresh
        </button>
      </div>
      <p className="muted small">
        Live reads from <code>{COOKIE_RPC}</code> · explorer{' '}
        <a href={COOKIE_EXPLORER} target="_blank" rel="noreferrer">
          cookiescan.io
        </a>
      </p>
      {err && <p className="bad">{err}</p>}
      {pulse && (
        <dl className="grid2">
          <div>
            <dt>Slot</dt>
            <dd className="mono">{pulse.slot.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Health</dt>
            <dd>{pulse.health}</dd>
          </div>
          <div>
            <dt>Core</dt>
            <dd className="mono">{pulse.version}</dd>
          </div>
          <div>
            <dt>Avg priority fee (micro-lamports)</dt>
            <dd className="mono">{Math.round(pulse.avgPriorityFee).toLocaleString()}</dd>
          </div>
          <div className="span2">
            <dt>Genesis</dt>
            <dd className="mono small wrap">
              {pulse.genesis}
              {pulse.genesis === COOKIE_GENESIS_HASH ? (
                <span className="ok"> · matches expected</span>
              ) : (
                <span className="warn"> · unexpected — verify RPC</span>
              )}
            </dd>
          </div>
        </dl>
      )}
    </section>
  )
}

