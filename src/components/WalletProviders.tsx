import { useMemo, type ReactNode } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { NightlyWalletAdapter } from '@solana/wallet-adapter-wallets'
import { COOKIE_RPC } from '../lib/cookie'
import '@solana/wallet-adapter-react-ui/styles.css'

export function WalletProviders({ children }: { children: ReactNode }) {
  // Nightly is required by the bounty listing.
  const wallets = useMemo(() => [new NightlyWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={COOKIE_RPC} config={{ commitment: 'confirmed' }}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
