# Cookie Fee Desk - Loom-style demo script (~90-120s)

Record when awake. Unlisted Loom / screen recording is enough; skip X-as-James.

**Props:** Nightly unlocked; Cookie RPC set; tiny COOK for fees; live URL open.

---

### 0:00-0:15 - Hook
> This is Cookie Fee Desk - a Nightly cApp on Cookie Chain for the Superteam Earn Cookie bounty. Live at jamesfincher.github.io/cookie-fee-desk.

Show browser address bar (live URL).

### 0:15-0:35 - Connect
1. Click Connect -> Nightly.
2. Approve.
3. Point to wallet address on screen.
> Nightly-only adapter, as required. Address shows after connect.

### 0:35-0:55 - Chain pulse
1. Scroll to pulse / health panel.
2. Show slot / genesis / priority fee updating.
> Live reads against rpc.cookiescan.io - genesis should match 9wDaBRDg...EcBB2.

### 0:55-1:15 - Fee desk
1. Open fee checker.
2. Enter sample organic volume (e.g. 71429).
3. Show estimated creator cash (~$250 at 0.35% with buyback on).
> Same Money Desk fee model - organic volume only, no wash.

### 1:15-1:45 - On-chain stamp
1. Click Stamp.
2. Sign 1-lamport self-transfer + SPL Memo in Nightly.
3. Wait for confirmation -> open CookieScan link.
> Confirmed on Cookie Chain. Memo MemoSq4gq...GmfcHr. Tx sig goes into Earn Q2.

Copy tx sig into a notepad for Earn paste.

### 1:45-2:00 - Close
> Open source at JamesFincher/cookie-fee-desk. Ready for Earn submit - GitHub, addresses with stamp sig, and live URL.

---

## Shot list (if no voice)
1. Live URL bar
2. Connect -> address
3. Pulse numbers
4. Fee estimator result
5. Stamp confirm + CookieScan
6. Repo README open

## Earn paste after recording
- GitHub: https://github.com/JamesFincher/cookie-fee-desk
- Live: https://jamesfincher.github.io/cookie-fee-desk/
- Addresses: see PASTE.txt (replace SIG with stamp tx)
