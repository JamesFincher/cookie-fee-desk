/** Cookie Chain network constants (official community endpoints). */
export const COOKIE_RPC = 'https://rpc.cookiescan.io'
export const COOKIE_WSS = 'https://wss.cookiescan.io'
export const COOKIE_EXPLORER = 'https://cookiescan.io'
export const COOKIE_BRIDGE = 'https://hyperlane.cookiescan.io'
export const COOKIE_DAS = 'https://api.cookiescan.io'
export const COOKIE_HOMEPAGE = 'https://www.cookiechain.wtf'
export const COOKIE_DOCS = 'https://docs.cookiechain.wtf'
export const COOKIE_SWAP = 'https://cookieswap.fun'
export const COOKIE_BOX = 'https://cookiebox.app'
export const NIGHTLY_DOWNLOAD = 'https://nightly.app/'

/** Genesis hash observed via getGenesisHash on community RPC (verify locally). */
export const COOKIE_GENESIS_HASH = '9wDaBRDgArEUpvhHxGguNkwozsZh4UpGZB9o2EoEcBB2'

export function explorerTx(sig: string) {
  return `${COOKIE_EXPLORER}/tx/${sig}`
}

export function explorerAccount(addr: string) {
  return `${COOKIE_EXPLORER}/account/${addr}`
}

export function explorerToken(mint: string) {
  return `${COOKIE_EXPLORER}/token/${mint}`
}

export function isLikelyPubkey(v: string) {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(v.trim())
}
