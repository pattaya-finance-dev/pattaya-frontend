import {JSBI, Token, TokenAmount} from "@pattayaswap-dev-libs/sdk";
import {BigNumber} from "@ethersproject/bignumber";

import {useMemo} from "react";
import {useMultipleContractSingleData} from "../multicall/hooks";

import MasterChef_ABI from "../../constants/abis/master-chef";
import { MASTER_CHEF_ADDRESS } from "../../constants";

export function usePoolInfo(
    pid: number
): [BigNumber, BigNumber] {

    const masterChefAddress : (string|undefined)[] = [MASTER_CHEF_ADDRESS];
    const results = useMultipleContractSingleData(masterChefAddress, MasterChef_ABI, 'poolInfo', [pid])

    return useMemo(
        () => {
            const { result: poolInfo, loading } = results[0]
            if (!poolInfo) return [BigNumber.from(0), BigNumber.from(0)]
            const { depositFeeBP, harvestInterval } = poolInfo;
            return [BigNumber.from(depositFeeBP.toString()), BigNumber.from(harvestInterval)];
        },
        [results]
    )

}

export function useUserInfo(
    pid: number,
    userAddress: string,
    token: Token,
): [BigNumber, TokenAmount] {

    const masterChefAddress : (string|undefined)[] = [MASTER_CHEF_ADDRESS];
    const results = useMultipleContractSingleData(masterChefAddress, MasterChef_ABI, 'userInfo', [pid, userAddress])

    return useMemo(
            () => {
                    const { result: userInfo, loading } = results[0]
                    if (!userInfo) return [BigNumber.from(0), new TokenAmount(token , BigInt(0))]
                    const { amount, nextHarvestUntil } = userInfo;
                    return [BigNumber.from(nextHarvestUntil.toString()), new TokenAmount(token ,amount.toString())];
            },
            [results,token]
        )

}

export function usePendingRewardBalances(
    pid: number,
    userAddress: string,
    token: Token,
): TokenAmount {
    const masterChefAddress : (string|undefined)[] = [MASTER_CHEF_ADDRESS];
    const results = useMultipleContractSingleData(masterChefAddress, MasterChef_ABI, 'pendingPattaya', [pid, userAddress])

    return useMemo(
        () => {
            const { result, loading } = results[0]
            return new TokenAmount(token ,result ? result.toString() : BigInt(0));
        },
        [results,token]
    )

}
