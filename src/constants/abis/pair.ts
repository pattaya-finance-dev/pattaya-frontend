import { Interface } from '@ethersproject/abi'
import { abi as IUniswapV2Pair } from '@uniswap/v2-core/build/IUniswapV2Pair.json'

const IUniswapV2Pair_ABI = new Interface(IUniswapV2Pair)

export default IUniswapV2Pair_ABI
