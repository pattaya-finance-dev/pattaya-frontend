import { parseBytes32String } from '@ethersproject/strings'
import { Currency, ETHER, Token, currencyEquals } from '@pattayaswap-dev-libs/sdk'
import {BigNumber} from "@ethersproject/bignumber";

import { useMemo } from 'react'
import {useSelectedTokenList, useTokenList} from '../state/lists/hooks'
import {NEVER_RELOAD, Result, useMultipleContractSingleData, useSingleCallResult} from '../state/multicall/hooks'


// eslint-disable-next-line import/no-cycle
import { useUserAddedTokens } from '../state/user/hooks'
import { isAddress } from '../utils'

import { useActiveWeb3React } from './index'
import {
  useBytes32TokenContract,
  useMasterChefContract,
  usePairContract,
  usePattayaTokenContract,
  useTokenContract
} from './useContract'
import {DEAD_ADDRESS} from "../constants";
import MasterChef_ABI from "../constants/abis/master-chef";
import IUniswapV2Pair_ABI from "../constants/abis/pair";

export function useAllTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()
  const allTokens = useSelectedTokenList()

  return useMemo(() => {
    if (!chainId) return {}
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: Token }>(
          (tokenMap, token) => {
            tokenMap[token.address] = token
            return tokenMap
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          { ...allTokens[chainId] }
        )
    )
  }, [chainId, userAddedTokens, allTokens])
}

export function useAllLPTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()
  const allTokens = useTokenList('pancakeswap-lp')

  return useMemo(() => {
    if (!chainId) return {}
    return (
        userAddedTokens
            // reduce into all ALL_TOKENS filtered by the current chain
            .reduce<{ [address: string]: Token }>(
                (tokenMap, token) => {
                  tokenMap[token.address] = token
                  return tokenMap
                },
                // must make a copy because reduce modifies the map, and we do not
                // want to make a copy in every iteration
                { ...allTokens[chainId] }
            )
    )
  }, [chainId, userAddedTokens, allTokens])
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency): boolean {
  const userAddedTokens = useUserAddedTokens()
  return !!userAddedTokens.find((token) => currencyEquals(currency, token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/
function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : bytes32 && BYTES32_REGEX.test(bytes32)
    ? parseBytes32String(bytes32)
    : defaultValue
}

export function useLPPairAddress(address?: string): [string, string] | [null,null] {

  const token0Address = useMultipleContractSingleData([address], IUniswapV2Pair_ABI, 'token0')
  const token1Address = useMultipleContractSingleData([address], IUniswapV2Pair_ABI, 'token1')

  const { result: data0, loading : loading0 } = token0Address[0]
  const { result: data1, loading : loading1 } = token1Address[0]

  return useMemo(() => {
    if (loading0 || loading1) return [null,null]
    if (data0 === undefined || data1 === undefined) return [null, null]
    return [data0.toString(),data1.toString()]
  },[loading0, loading1, data1, data0])

}

export function useLPToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllLPTokens()

  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address || undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address || undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined


  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
      token ? undefined : tokenContractBytes32,
      'name',
      undefined,
      NEVER_RELOAD
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
          chainId,
          address,
          decimals.result[0],
          parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
          parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      )
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ])
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address || undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address || undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined


  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      )
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ])
}

export function useCurrency(currencyId: string | undefined): Currency | null | undefined {
  const isETH = currencyId?.toUpperCase() === 'ETH'
  const token = useToken(isETH ? undefined : currencyId)
  return isETH ? ETHER : token
}

export function useTransferTaxRate(tokenAddress?: string): [undefined,undefined,undefined,undefined, undefined] | [BigNumber, number, number, number, number] {
  const { chainId } = useActiveWeb3React()
  const address = isAddress(tokenAddress)

  const tokenContract = usePattayaTokenContract(address || undefined, false)
  const masterChefContract = useMasterChefContract(false)

  const transferTaxRate = useSingleCallResult(tokenContract, 'transferTaxRate', undefined, NEVER_RELOAD)
  const totalSupply = useSingleCallResult(tokenContract, 'totalSupply', undefined, NEVER_RELOAD)
  const totalBurn = useSingleCallResult(tokenContract, 'balanceOf', [DEAD_ADDRESS], NEVER_RELOAD)
  const totalLockedUpRewards = useSingleCallResult(masterChefContract, 'totalLockedUpRewards', undefined, NEVER_RELOAD)


  return useMemo(() => {
    if (!chainId || !address) return [undefined, undefined, undefined, undefined, undefined]
    if (transferTaxRate.loading || totalSupply.loading || totalBurn.loading) return [undefined, undefined, undefined, undefined, undefined]
    if (transferTaxRate.result) {
      const mint = totalSupply.result?.[0]/10**18;
      const burn = totalBurn.result?.[0]/10**18;
      const lockedUp = totalLockedUpRewards.result?.[0]/10**18;
      const circulating = mint - burn - lockedUp
      return [BigNumber.from(transferTaxRate.result?.[0]),
              mint,
              burn,
              lockedUp,
              circulating
              ];
    }
    return [ undefined, undefined , undefined, undefined, undefined]
  }, [
    address,
    chainId,
    transferTaxRate,
    totalSupply,
    totalBurn,
    totalLockedUpRewards
  ])
}
