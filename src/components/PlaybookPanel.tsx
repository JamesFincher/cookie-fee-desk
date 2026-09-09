import { PLAYBOOK_BULLETS } from '../lib/fees'
import { COOKIE_BRIDGE, COOKIE_DOCS, NIGHTLY_DOWNLOAD } from '../lib/cookie'

export function PlaybookPanel() {
  return (
    <section className="card">
      <h2>Agent revenue playbook (teaser)</h2>
      <p className="muted small">
        Ported from Money Desk <code>PLAYBOOK.md</code> / fee-checker — adapted for Cookie Chain
        iteration costs (sub-cent deploys, Nightly + community RPC).
      </p>
      <ol className="checklist">
        {PLAYBOOK_BULLETS.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ol>
      <div className="links">
        <a href={NIGHTLY_DOWNLOAD} target="_blank" rel="noreferrer">
          Install Nightly
        </a>
        <a href={COOKIE_BRIDGE} target="_blank" rel="noreferrer">
          Bridge COOK (Hyperlane)
        </a>
        <a href={COOKIE_DOCS} target="_blank" rel="noreferrer">
          Cookie Chain docs
        </a>
      </div>
    </section>
  )
}
