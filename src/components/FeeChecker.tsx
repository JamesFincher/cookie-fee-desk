import { useMemo, useState } from 'react'
import {
  FEE_LANES,
  creatorCashUsd,
  volumeForGoal,
} from '../lib/fees'
import {
  COOKIE_BOX,
  COOKIE_EXPLORER,
  COOKIE_SWAP,
  explorerAccount,
  explorerToken,
  isLikelyPubkey,
} from '../lib/cookie'

export function FeeChecker() {
  const [mintOrAddr, setMintOrAddr] = useState('')
  const [volume, setVolume] = useState(71_400)
  const [goal, setGoal] = useState(250)
  const [laneId, setLaneId] = useState(FEE_LANES[0].id)

  const lane = FEE_LANES.find((l) => l.id === laneId) ?? FEE_LANES[0]
  const cash = useMemo(
    () => creatorCashUsd(volume, lane.creatorBpsOfVolume),
    [volume, lane],
  )
  const needVol = useMemo(
    () => volumeForGoal(goal, lane.creatorBpsOfVolume),
    [goal, lane],
  )

  const trimmed = mintOrAddr.trim()
  const okShape = trimmed.length === 0 || isLikelyPubkey(trimmed)

  return (
    <section className="card">
      <h2>Fee checker (Money Desk port)</h2>
      <p className="muted small">
        Same honest creator-fee math as Money Desk fee-checker / FEE-MODEL, plus CookieScan
        deep links. Cookie Chain tx fees are tiny; <strong>creator cash still needs organic volume</strong>.
      </p>

      <label htmlFor="mint">Mint / account (Cookie Chain)</label>
      <input
        id="mint"
        className="mono"
        value={mintOrAddr}
        onChange={(e) => setMintOrAddr(e.target.value)}
        placeholder="Base58 pubkey…"
        spellCheck={false}
        autoComplete="off"
      />
      <p className={okShape ? 'hint ok' : 'hint bad'}>
        {trimmed
          ? okShape
            ? 'Looks like a Solana/Cookie pubkey.'
            : 'Doesn’t look like base58 pubkey — links still built.'
          : 'Paste a mint or wallet to open CookieScan.'}
      </p>

      {trimmed && (
        <div className="links">
          <a href={explorerAccount(trimmed)} target="_blank" rel="noreferrer">
            Account on CookieScan
          </a>
          <a href={explorerToken(trimmed)} target="_blank" rel="noreferrer">
            Token view on CookieScan
          </a>
          <a href={COOKIE_EXPLORER} target="_blank" rel="noreferrer">
            Explorer home
          </a>
          <a href={COOKIE_BOX} target="_blank" rel="noreferrer">
            Cookiebox
          </a>
          <a href={COOKIE_SWAP} target="_blank" rel="noreferrer">
            Cookieswap
          </a>
        </div>
      )}

      <div className="grid2 tight">
        <div>
          <label htmlFor="lane">Creator fee lane</label>
          <select id="lane" value={laneId} onChange={(e) => setLaneId(e.target.value)}>
            {FEE_LANES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label} · {(l.creatorBpsOfVolume / 100).toFixed(2)}%
              </option>
            ))}
          </select>
          <p className="hint">{lane.note}</p>
        </div>
        <div>
          <label htmlFor="vol">Organic volume (USD)</label>
          <input
            id="vol"
            type="number"
            min={0}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value) || 0)}
          />
          <p className="hint">
            Estimated creator cash: <strong>${cash.toFixed(2)}</strong>
          </p>
        </div>
        <div>
          <label htmlFor="goal">Goal (USD)</label>
          <input
            id="goal"
            type="number"
            min={0}
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value) || 0)}
          />
          <p className="hint">
            Volume needed ≈ <strong>${needVol.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
          </p>
        </div>
      </div>

      <div className="callout">
        Wash / fake volume is out of bounds. Cold mint + no reach usually clears ~$0, not a paycheck.
        Use Cookie Chain for cheap iteration; size goals from organic flow only.
      </div>
    </section>
  )
}
