/**
 * Fee / playbook math reused from Money Desk fee-checker + FEE-MODEL.
 * Cookie Chain itself has tiny tx fees (paid in COOK). Creator-fee lanes
 * still depend on organic volume wherever you launch (Cookiebox / Cookieswap /
 * Solana pump / Pons-style). Zero organic volume = zero creator cash.
 */

export type FeeLane = {
  id: string
  label: string
  creatorBpsOfVolume: number
  note: string
}

export const FEE_LANES: FeeLane[] = [
  {
    id: 'pons-buyback',
    label: 'Pons / RH (buyback on)',
    creatorBpsOfVolume: 35, // 0.35%
    note: 'Money Desk fee-checker default when buyback on + creatorTaxBps=0.',
  },
  {
    id: 'pons-no-buyback',
    label: 'Pons / RH (buyback off)',
    creatorBpsOfVolume: 70, // 0.70%
    note: '~70% of 1% pool fee when buyback is off.',
  },
  {
    id: 'pump-curve',
    label: 'Pump.fun bonding curve',
    creatorBpsOfVolume: 30, // 0.30%
    note: 'From Money Desk FEE-MODEL: 0.30% creator of 1.25% total curve fee.',
  },
]

export function creatorCashUsd(volumeUsd: number, bps: number) {
  return (volumeUsd * bps) / 10_000
}

export function volumeForGoal(goalUsd: number, bps: number) {
  if (bps <= 0) return Infinity
  return (goalUsd * 10_000) / bps
}

/** Rough Cookie Chain transfer fee display from lamports (9-decimal COOK). */
export function cookFromLamports(lamports: number | bigint) {
  const n = typeof lamports === 'bigint' ? Number(lamports) : lamports
  return n / 1e9
}

export const PLAYBOOK_BULLETS = [
  'Paper before live. Simulate fee estimates with no wallet.',
  'Gate irreversible: spend / launch / sign / public post waits for human yes.',
  'Prefer creator-fee lanes over ungated speculative trading.',
  'Zero organic volume = zero creator fees. No wash / fake volume.',
  'Log every cycle: thesis, checks, decision, outcome, fees, gas.',
  'On Cookie Chain: use Nightly + rpc.cookiescan.io; bridge COOK via Hyperlane.',
]
