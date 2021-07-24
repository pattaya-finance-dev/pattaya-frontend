import {JSBI, Token, TokenAmount, WETH} from "@pattayaswap-dev-libs/sdk";
import {BigNumber} from "@ethersproject/bignumber";

import {useMemo} from "react";
import {useMultipleContractSingleData} from "../multicall/hooks";

import Referral_ABI from "../../constants/abis/referral";
import { REFERRAL_ADDRESS } from "../../constants";

export function useReferralsCount(
    referrer: string | undefined
): [BigNumber] {

    const referralAddress : (string|undefined)[] = [REFERRAL_ADDRESS];
    const results = useMultipleContractSingleData(referralAddress, Referral_ABI, 'referralsCount', [referrer])

    return useMemo(
        () => {
            if (!referrer) return [BigNumber.from(0)]

            const { result: referralsCount, loading } = results[0]
            if (!referralsCount) return [BigNumber.from(0)]
            return [BigNumber.from(referralsCount[0])];
        },
        [results,referrer]
    )

}

export function useReferralsCommission(
    token: Token | undefined,
    referrer: string | undefined
): TokenAmount {

    const referralAddress : (string|undefined)[] = [REFERRAL_ADDRESS];
    const results = useMultipleContractSingleData(referralAddress, Referral_ABI, 'totalReferralCommissions', [referrer])
    const tokenType = token ?? WETH[97]

    return useMemo(
        () => {
            if (!referrer) return new TokenAmount(tokenType, BigInt(0))

            const { result: totalReferralCommissions } = results[0]
            if (!totalReferralCommissions) return new TokenAmount(tokenType, BigInt(0))
            return new TokenAmount(tokenType, BigInt(totalReferralCommissions[0]));
        },
        [results,referrer, tokenType]
    )

}
