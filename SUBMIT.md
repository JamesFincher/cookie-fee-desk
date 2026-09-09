# SUBMIT — Create an App on Cookie Chain (Superteam Earn)

| Field | Value |
| --- | --- |
| Listing | https://superteam.fun/earn/listing/create-an-app-on-cookie-chain-app/ |
| Listing id | d777e3ce-3942-4d2f-ab9a-3793327e389f |
| Access | HUMAN_ONLY — agent API cannot submit |
| Pool | 1000 USDC (1st 500 / 2nd 500) |
| Deadline | 2026-09-22 21:59:59 UTC (~2:59pm PT) |
| Winners by | 2026-09-28 |
| Submissions at scaffold | ~37 |
| Local path | /workspace/money/bounties/cookie-capp/ |
| App name | Cookie Fee Desk |

## Listing requirements (fetched)

### Must
- Web app on Cookie Chain (SVM) with meaningful on-chain interaction
- Nightly wallet support (required)
- Wallet connect + display address
- Transaction execution + confirmation + error feedback
- App-specific data / activity
- Deployed + publicly accessible
- Open-source GitHub + README
- Submit: live URL, GitHub, program/token/app addresses if any

### Encouraged
- Cookiebox / Cookieswap / Cookie DAS / CookieScan / cookie-mcp

### Demo (human)
- X thread explaining + demo + bridge guide where relevant
- Share thread in Cookie Chain Telegram https://t.me/TheCookieNetChain

## Eligibility answers

| # | Question | Answer |
| --- | --- | --- |
| 1 | GitHub repository | (public repo URL after push) |
| 2 | Relevant program/contract/token/app addresses | RPC https://rpc.cookiescan.io ; Genesis 9wDaBRDgArEUpvhHxGguNkwozsZh4UpGZB9o2EoEcBB2 ; Memo MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr ; add stamp tx sigs after demo |
| 3 | Live application URL | (hosting URL after human deploy) |

## Human checklist (awake)

### A. Accounts
- [ ] Superteam Earn SSO + talent profile + email verify
- [ ] Nightly installed; Cookie RPC configured
- [ ] Bridge tiny COOK for gas if empty: https://hyperlane.cookiescan.io

### B. Ship artifact
- [ ] Local production build clean
- [ ] Push folder to public GitHub (suggested JamesFincher/cookie-fee-desk)
- [ ] Deploy dist/ to hosting (needs James SSO/token)
- [ ] Smoke: Nightly connect, stamp tx, CookieScan link

### C. Demo (blocked this asleep run)
- [ ] X thread — SKIP (no X as James)
- [ ] Telegram share — needs human
- Optional: Loom/unlisted video if sponsor accepts; ask on t.me/TheCookieNetChain

### D. Earn Submit Now
- [ ] Paste GitHub + addresses + live URL
- [ ] Confirm on Earn profile
- [ ] Await announce ~Sep 28; KYC if requested

## Scaffold already covers
- Nightly-only adapter on Cookie RPC
- Live chain pulse
- Fee checker + playbook reuse from Money Desk
- On-chain stamp with status UX
- README + SUBMIT

## Blockers (honest)
1. HUMAN_ONLY Earn submit
2. Live public URL needs human deploy credentials
3. Public GitHub push needs human gh auth
4. X thread + Telegram out of bounds this asleep run
5. COOK gas needed for stamp tx
6. Custom Anchor program optional; Memo + SystemProgram used now
7. ~37 submissions already — earlier live demo helps

## Constraints honored
James asleep; \$250 goal; earned \$0; no ask; no wash; no X as James. Scaffold only.
