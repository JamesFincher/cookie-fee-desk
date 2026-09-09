# Cookie Fee Desk — Cookie Chain cApp

Minimal on-chain web app for the Superteam Earn bounty
[Create an App on Cookie Chain](https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/) (1000 USDC).

| | |
| --- | --- |
| **Live** | https://jamesfincher.github.io/cookie-fee-desk/ |
| **Repo** | https://github.com/JamesFincher/cookie-fee-desk |
| **Submit packet** | [SUBMIT.md](./SUBMIT.md) ; [PASTE.txt](./PASTE.txt) |
| **Demo script** | [DEMO-SCRIPT.md](./DEMO-SCRIPT.md) (Loom-style when awake) |
| **Deadline** | 2026-09-22 21:59:59 UTC (~2:59pm PT) |
| **Access** | HUMAN_ONLY Earn submit (SSO) |

## What it is

**Cookie Fee Desk** ports Money Desk tools onto Cookie Chain:

- **Fee checker** — organic volume to creator cash estimator (Pons / Pump lanes from Money Desk FEE-MODEL + fee-checker)
- **Playbook teaser** — agent revenue operating rules from Money Desk PLAYBOOK.md
- **Chain pulse** — live slot / health / genesis / priority fees via https://rpc.cookiescan.io
- **On-chain stamp** — Nightly-signed 1-lamport self-transfer + SPL Memo with confirmation + CookieScan link

Built for **Nightly** wallet (required by the listing) against Cookie Chain SVM RPC.
## Quick start
Use package manager to install, then run the local web server and production build.
Nightly wallet required. Cookie RPC: https://rpc.cookiescan.io WSS: https://wss.cookiescan.io Bridge: https://hyperlane.cookiescan.io

## Stack
- Genesis (verify): `9wDaBRDgArEUpvhHxGguNkwozsZh4UpGZB9o2EoEcBB2`
- Vite + React + TypeScript
- solana web3.js to Cookie Chain community RPC
- wallet-adapter with NightlyWalletAdapter only
- SPL Memo MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr

## Bounty checklist coverage
- Cookie Chain SVM: yes
- Nightly connect + address display: yes
- Tx execution + confirm + errors: yes (stamp)
- App data / analytics: yes (pulse + fee desk + activity)
- Open source README: yes
- Live public URL: https://jamesfincher.github.io/cookie-fee-desk/
- X thread + Telegram: human / SKIP asleep; use DEMO-SCRIPT.md


## Human submit (when awake)

1. Install Nightly; set Cookie RPC/WSS; bridge tiny COOK if needed.
2. Open live URL -> Connect Nightly -> Stamp -> copy CookieScan tx sig.
3. Earn Submit Now -> paste from SUBMIT.md / PASTE.txt.
4. Optional Loom: follow DEMO-SCRIPT.md; skip X-as-James this cycle.

## Resources
- Docs https://docs.cookiechain.wtf
- Explorer https://cookiescan.io
- DAS https://api.cookiescan.io
- Bridge https://hyperlane.cookiescan.io
- Listing https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/

## Honesty
Not financial advice. No wash volume. Creator fees require organic flow.

## Links
- Live: https://jamesfincher.github.io/cookie-fee-desk/
- Repo: https://github.com/JamesFincher/cookie-fee-desk
- Submit packet: SUBMIT.md
