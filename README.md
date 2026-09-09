# Cookie Fee Desk — Cookie Chain cApp

Minimal on-chain web app for the Superteam Earn bounty
[Create an App on Cookie Chain](https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/) (1000 USDC).

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
- Live public URL: human deploy (see SUBMIT.md)
- X thread + Telegram: human / SKIP this asleep run

## Resources
- Docs https://docs.cookiechain.wtf
- Explorer https://cookiescan.io
- DAS https://api.cookiescan.io
- Bridge https://hyperlane.cookiescan.io
- Listing https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/

## Honesty
Not financial advice. No wash volume. Creator fees require organic flow.
