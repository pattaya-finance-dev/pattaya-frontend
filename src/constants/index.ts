import { ChainId, JSBI, Percent, Token, WETH } from '@pattayaswap-dev-libs/sdk'

export const ROUTER_ADDRESS = '0xBD351b7073a6B5bbbEaC57b51ba836Cbc9372A76'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.BSCTESTNET, '0x8a9424745056Eb399FD19a0EC26A14316684e274', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.BSCTESTNET, '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18, 'BUSD', 'Binance USD')
export const USDT = new Token(ChainId.BSCTESTNET, '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684', 18, 'USDT', 'Tether USD')
export const UST = new Token(
    ChainId.BSCTESTNET,
    '0x42f57bb2e75660d9d3c28df41f97281ba606f8c0',
    18,
    'UST',
    'Wrapped UST Token'
)


/* export const DAI = new Token(ChainId.MAINNET, '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.MAINNET, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18, 'BUSD', 'Binance USD')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059ff775485246999027b3197955', 18, 'USDT', 'Tether USD')
export const UST = new Token(
  ChainId.MAINNET,
  '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
  18,
  'UST',
  'Wrapped UST Token'
) */

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT, UST],
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], DAI, BUSD, USDT, UST],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  // [ChainId.MAINNET]: {},
  [ChainId.BSCTESTNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], DAI, BUSD, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  // [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], DAI, BUSD, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  /* [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x1f546ad641b56b86fd9dceac473d1c7a357276b7', 18, 'PANTHER', 'PantherSwap Token'),
      new Token(ChainId.MAINNET, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
    ],
    [BUSD, USDT],
    [DAI, USDT],
  ], */
  [ChainId.BSCTESTNET]: [
        [
            new Token(ChainId.BSCTESTNET, '0xd7Cf8c8e4750972fcF40eec469a4DECEA1C92812', 18, 'PATTAYA', 'Pattaya Token'),
            new Token(ChainId.BSCTESTNET, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', 18, 'WBNB', 'Wrapped BNB'),
        ],
        [BUSD, USDT],
        [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 650
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
