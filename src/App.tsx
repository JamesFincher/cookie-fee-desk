import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletProviders } from './components/WalletProviders'
import { ChainPulse } from './components/ChainPulse'
import { FeeChecker } from './components/FeeChecker'
import { StampTx } from './components/StampTx'
import { PlaybookPanel } from './components/PlaybookPanel'
import { COOKIE_BRIDGE, COOKIE_RPC, NIGHTLY_DOWNLOAD } from './lib/cookie'
import './App.css'

function Desk() {
  const { publicKey, connected, wallet } = useWallet()

  return (
    <div className="wrap">
      <header className="hero">
        <div>
          <p className="eyebrow">Cookie Chain cApp · Superteam Earn</p>
          <h1>Cookie Fee Desk</h1>
          <p className="lede">
            Creator-fee checker + agent playbook desk on Cookie Chain. Connect{' '}
            <strong>Nightly</strong>, read live chain pulse, stamp an on-chain fee note, and size
            organic volume honestly.
          </p>
        </div>
        <div className="wallet-box">
          <WalletMultiButton />
          {connected && publicKey ? (
            <p className="mono small wrap">
              {wallet?.adapter.name ?? 'Wallet'}: {publicKey.toBase58()}
            </p>
          ) : (
            <p className="muted small">
              Need Nightly?{' '}
              <a href={NIGHTLY_DOWNLOAD} target="_blank" rel="noreferrer">
                nightly.app
              </a>
              <br />
              Point RPC at <code>{COOKIE_RPC}</code>
            </p>
          )}
        </div>
      </header>

      <ChainPulse />
      <StampTx />
      <FeeChecker />
      <PlaybookPanel />

      <footer>
        Bridge COOK if empty:{' '}
        <a href={COOKIE_BRIDGE} target="_blank" rel="noreferrer">
          {COOKIE_BRIDGE}
        </a>
        <br />
        Not financial advice · no wash · organic volume only · Money Desk × Cookie Chain
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <WalletProviders>
      <Desk />
    </WalletProviders>
  )
}
