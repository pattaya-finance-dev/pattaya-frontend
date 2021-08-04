
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import styled from "styled-components";
import { Timeline } from 'react-twitter-widgets'

import {Button} from "@pattayaswap-dev-libs/uikit";
import {CurrencyAmount, TokenAmount} from "@pattayaswap-dev-libs/sdk";
import {TransactionResponse} from "@ethersproject/providers";
import {BigNumber} from "@ethersproject/bignumber";

import ConnectWalletButton from 'components/ConnectWalletButton'
import {useActiveWeb3React} from "../../hooks";
import {useCurrencyBalances} from "../../state/wallet/hooks";

import {PATTAYA} from "../../constants";

import farms from '../../constants/farms/pattaya_farms.json'
import pools from '../../constants/farms/pattaya_pools.json'

import {getEmissionRate, HarvestCall, pendingPattayaMultiCall} from "../../hooks/Trades";
import {calculateGasMargin, getMasterChefContract} from "../../utils";
import {useTransferTaxRate} from "../../hooks/Tokens";


const allPools = farms.tokens.concat(pools.tokens)

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 32px 16px;
    margin-bottom: 16px;
    background-image: url('/images/bg_farms.png');
`;

const BorderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 224px;
    padding-right: 224px;
`;

const BodyWrapper = styled.div`

    @media screen and (min-width: 576px)
    {
        padding-top: 24px;
        padding-bottom: 24px;
    }

    @media screen and (min-width: 968px)
    { 
        padding-top: 32px;
        padding-bottom: 32px;
    }
    
    min-height: calc(100vh - 64px);

    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
    
`;

const PattayaLogo = styled.img`
    width: 404px;
    position: absolute;
    top: 65px;
`

const PattayaTitle = styled.span`
    text-align: center;
    position: absolute;
    width: 465px;
    color: #ffffff;
    top: 184px;
    font-family: 'Poppins';
    font-size: 16px;
    line-height: 24px;
`

const TwoColumnsRowContainer = styled.div`
    -webkit-box-align: stretch;
    align-items: stretch;
    justify-content: stretch;
    margin-bottom: 32px;
    
    @media screen and (min-width: 576px) { 
        grid-template-columns: repeat(8, 1fr);
        gap: 24px;
    }
    
    @media screen and (min-width: 852px) {
        grid-template-columns: repeat(12, 1fr);
        gap: 24px;
    }
    
    @media screen and (min-width: 968px) {
        grid-template-columns: repeat(12, 1fr);
        gap: 32px;
    }
    
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
`

const TwoColumnsBlockContainer = styled.div`
   
    @media screen and (min-width: 576px)
    {
        grid-column: span 8 / auto;
    }
    
    @media screen and (min-width: 852px) {
        grid-column: span 6 / auto;
    }

    @media screen and (min-width: 968px) {
        grid-column: span 6 / auto;
    }
 
    grid-column: span 6 / auto;
    width: 100%;
    
    background-repeat: no-repeat;
    background-position: right top;
    min-height: 376px;
    
    background-color: #262626;
    

    
    border-radius: 32px;
    border: 2px solid #D136FF;
    
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 0.8rem #bc13fe, inset 0 0 0.3rem #d136ff;
    
    color: rgb(255, 255, 255);
    overflow: hidden;
    position : relative;
`

const TwoColumnsBlockPadding = styled.div`
    padding: 24px;
`

const UserStatsTitle = styled.h2`
    font-family: 'Poppins';
    font-size: 32px;
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 24px;
`

const PattayaTokenICONContainer = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 16px;
    min-height:73px;
`

const PattayaTokenImg = styled.img`
    margin-right: 12px;
`

const MetaMaskButton = styled.button`
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(45, 47, 55);
    border: 0px;
    border-radius: 16px;
    box-shadow: none;
    color: #D136FF;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    width: max-content;
    height: 32px;
    line-height: 1;
    letter-spacing: 0.03em;
    -webkit-box-pack: center;
    justify-content: center;
    outline: 0px;
    padding: 0px 16px;
    transition: background-color 0.2s ease 0s;
    opacity: 1;
`

const SubtitleContainer = styled.div`
    margin-bottom: 16px;
`

const SubtitleText = styled.div`
    color: #D136FF;
    font-weight: 500;
    font-family: 'Poppins';
    font-size: 18px;
`

const ValueText = styled.div`
    color: #ffffff;
    font-weight: 600;
    font-family: 'Poppins';
    font-size: 58px; 
    margin-top:8px;
    margin-bottom:4px;
`

const SubValueText = styled.div`
    color: #ffffff;
    font-weight: 400;
    font-family: 'Poppins';
    font-size: 20px; 
    margin-top:8px;
`

const MetaMaskIcon = styled.img`
    margin-left: 8px;
`


const backgroundPattayaStyle : React.CSSProperties = {
    backgroundImage : "url('images/pattaya_background.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0px top 0px'
}

const backgroundWalletStyle : React.CSSProperties = {
    backgroundImage : "url('images/wallet_background.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0px top 0px'
}

const normalStyle : React.CSSProperties = {
    minHeight:'auto',
    borderColor:'#262626',
    boxShadow:'none'
}

const stackNormalStyle : React.CSSProperties = {
    minHeight:'auto',
    borderColor:'#262626',
    boxShadow:'none',

    marginBottom: '24px'
}

const TitleText = styled.h2`
    @media screen and (min-width: 968px) { 
        font-size: 28px;
    }

    font-size: 28px;
    font-weight: 600;
    line-height: 1.1;
    
    color: rgb(255, 255, 255);
    font-family: 'Poppins';
    font-size: 18px;
    margin-bottom: 16px;
`

const TitleValueText = styled.div`
    line-height: 1.5;
    color: rgb(255, 255, 255);
    font-size: 38px;
    font-weight: 600;
    font-family: 'Poppins';
`

const SubtitleValueText = styled.div`
    font-family: 'Poppins';
    color: #D136FF;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
`

const StatRowContainer = styled.div`
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    font-size: 14px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: 8px;
}
`

const StatsTitleText = styled.div`
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
     font-family: 'Poppins';
`


const StatsValueText = styled.div`
    line-height: 1.5
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 600;
     font-family: 'Poppins';
`

const TwoBlocksContainer = styled.div`
@media screen and (min-width: 576px){
    grid-column: span 8 / auto;
}

@media screen and (min-width: 852px) {
    grid-column: span 6 / auto;
}

@media screen and (min-width: 968px) {
    grid-column: span 6 / auto;
}


    grid-column: span 6 / auto;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    -webkit-box-align: stretch;
    align-items: stretch;
`


const tokenImage = 'https://wizardly-rosalind-39fbfb.netlify.app/images/coins/PATTAYA.png'


const Home = () => {

    const { chainId, library, account }  = useActiveWeb3React()

    const [harvestAmount, setHarvestAmount] = useState('0')
    const [emissionRate, setEmissionRate] = useState('0')
    const [harvestCallData, setHarvestCallData] = useState<HarvestCall[]>([])

    const balances: (CurrencyAmount | undefined)[] = useCurrencyBalances(account ?? undefined, [
        PATTAYA
    ])

    const [taxRate, totalSupply, totalBurn, totalLockedUpRewards, totalCirculatingSupply] = useTransferTaxRate(PATTAYA.address)

    const onHarvest = useCallback(async (pid: number) => {
        if (!chainId || !library || !account) return
        const router = getMasterChefContract(chainId, library, account)


        const estimate = router.estimateGas.deposit
        const method: (...args: any) => Promise<TransactionResponse> = router.deposit
        const value: BigNumber | null = null;
        const args: Array<string | string[] | number> = [
            pid,
            0,
            '0x0000000000000000000000000000000000000000'
        ]

        // setAttemptingTxn(true)
        // const aa = await estimate(...args, value ? { value } : {})
        await estimate(...args, value ? { value } : {})
            .then((estimatedGasLimit) =>
                method(...args, {
                    ...(value ? { value } : {}),
                    gasLimit: calculateGasMargin(estimatedGasLimit),
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                }).then((response) => {})
            )
            .catch((e) => {
                // setAttemptingTxn(false)
                // we only care if the error is something _other_ than the user rejected the tx
                if (e?.code !== 4001) {
                    console.error(e)
                }
            })
    }, [account,library,chainId])

    const onHarvestClick = useCallback(()=> {
        harvestCallData.forEach((call) => {
            onHarvest(call.pid);
        })
    },[harvestCallData,onHarvest])

    useEffect(() => {
        const callFunc = async () => {
            const calls = allPools.map((pool) => ({
                address: pool.address,
                name: "pendingPattaya",
                params: [pool.pid, account],
            }));

            return pendingPattayaMultiCall(library, account, calls)
        }

        const callEmission = async () => {
            return getEmissionRate(library)
        }

        callEmission().then((result) => {
            // console.log(result);
            setEmissionRate(result.toString())
        })

        callFunc().then((result) => {
            if(result !== null) {
                const tokenAmount: TokenAmount = result[0] as TokenAmount;
                const harvestCalls: HarvestCall[] = result[1] as HarvestCall[];
                setHarvestAmount(tokenAmount.toSignificant())
                setHarvestCallData(harvestCalls)
            }
        })
    },[library, account])



    // we use raw ethereum , just don't use the library. it doesn't work for some reasons.
    const { ethereum } = window

    const onAddSuggestedToken = useCallback(() => {
        const params = {
            type: 'ERC20',
            options: {
                address: PATTAYA.address,
                symbol:  PATTAYA.symbol,
                decimals: PATTAYA.decimals,
                image: tokenImage
            }
        }

        if(ethereum) {
            // @ts-ignore
            ethereum.request({
                method: 'wallet_watchAsset',
                params
            }).then((success) => {
                if (!success) {
                    throw new Error('Something went wrong.')
                }
            }).catch(console.error)
        }
    },[ethereum])

    return (
        <>
            <HeaderWrapper>
                <BorderWrapper>
                    <img src='/images/top_border.png' alt='top_border' style={{height:'120px', maxWidth:'unset'}}/>
                    <PattayaLogo src='/images/pattaya_logo.png' alt='logo_main' />
                    <PattayaTitle>The First Automatic Liquidity Acquisition Yield Farm & AMM on Binance Smart Chain.</PattayaTitle>
                    <img src='/images/bottom_border.png' alt='bottom_border' style={{height:'120px', maxWidth:'unset', marginTop:'24px'}}/>
                </BorderWrapper>
            </HeaderWrapper>
            <BodyWrapper>
                <div>
                    <TwoColumnsRowContainer>
                        <TwoColumnsBlockContainer style={backgroundPattayaStyle}>
                            <TwoColumnsBlockPadding>
                                <UserStatsTitle>Farms & Staking</UserStatsTitle>
                                <PattayaTokenICONContainer>
                                    <PattayaTokenImg src='/images/coins/PATTAYA.png' />
                                    <MetaMaskButton onClick={onAddSuggestedToken}>
                                        +
                                        <MetaMaskIcon width={16} src='/images/metamask.png' />
                                    </MetaMaskButton>
                                </PattayaTokenICONContainer>
                                <SubtitleContainer>
                                    <SubtitleText>PATTAYA to Harvest</SubtitleText>
                                    { account ?
                                        <>
                                            <ValueText>{harvestAmount}</ValueText>
                                            <SubValueText>~$0</SubValueText>
                                            <Button disabled={harvestCallData.length === 0} style={{marginTop: '24px'}} onClick={onHarvestClick} fullWidth>
                                                Harvest All
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <ValueText style={{color : '#666171', fontSize:'35px'}}>LOCKED</ValueText>
                                            <SubValueText>~$0</SubValueText>
                                            <ConnectWalletButton style={{marginTop: '24px'}} fullWidth/>
                                        </>
                                    }
                                </SubtitleContainer>
                            </TwoColumnsBlockPadding>
                        </TwoColumnsBlockContainer>
                        <TwoColumnsBlockContainer style={backgroundWalletStyle}>
                            <TwoColumnsBlockPadding>
                                <UserStatsTitle>Your Wallet</UserStatsTitle>
                                <PattayaTokenICONContainer>
                                    <PattayaTokenImg src='/images/wallet_icon.png' />
                                </PattayaTokenICONContainer>
                                <SubtitleContainer>
                                    <SubtitleText>PATTAYA in Wallet</SubtitleText>
                                    { account ?
                                        <>
                                            <ValueText>{balances[0] !== undefined ? balances[0].toSignificant() : '0'}</ValueText>
                                            <SubValueText>~$0</SubValueText>
                                        </>
                                        :
                                        <>
                                            <ValueText style={{color : '#666171', fontSize:'35px'}}>LOCKED</ValueText>
                                            <SubValueText>~$0</SubValueText>
                                            <ConnectWalletButton style={{marginTop: '24px'}} fullWidth/>
                                        </>
                                    }
                                </SubtitleContainer>
                            </TwoColumnsBlockPadding>
                        </TwoColumnsBlockContainer>
                    </TwoColumnsRowContainer>
                    <TwoColumnsRowContainer>
                        <TwoColumnsBlockContainer style={normalStyle}>
                            <TwoColumnsBlockPadding>
                                <UserStatsTitle>TVL: Total Value Locked</UserStatsTitle>
                                <TitleValueText>N/A</TitleValueText>
                                <SubtitleValueText>Across all Farms and Pools</SubtitleValueText>
                            </TwoColumnsBlockPadding>
                        </TwoColumnsBlockContainer>
                        <TwoColumnsBlockContainer style={normalStyle}>
                            <TwoColumnsBlockPadding>
                                <UserStatsTitle>Dex Stats</UserStatsTitle>
                                <StatRowContainer>
                                    <StatsTitleText>Total Liquidity</StatsTitleText>
                                    <StatsValueText>N/A</StatsValueText>
                                </StatRowContainer>
                                <StatRowContainer>
                                    <StatsTitleText>24H Volume</StatsTitleText>
                                    <StatsValueText>N/A</StatsValueText>
                                </StatRowContainer>
                            </TwoColumnsBlockPadding>
                        </TwoColumnsBlockContainer>
                    </TwoColumnsRowContainer>
                    <TwoColumnsRowContainer>
                        <TwoColumnsBlockContainer style={normalStyle}>
                            <TwoColumnsBlockPadding>
                                <UserStatsTitle>Announcements</UserStatsTitle>
                                <div>
                                    <Timeline
                                        dataSource={{
                                            sourceType: 'profile',
                                            screenName: 'PantherSwap'
                                        }}
                                        options={{
                                            theme: 'dark',
                                            height: '450',
                                            width: '510',
                                            chrome: 'noheader%20nofooter%20noscrollbar'
                                        }}
                                    />
                                </div>
                            </TwoColumnsBlockPadding>
                        </TwoColumnsBlockContainer>
                        <TwoBlocksContainer>
                            <TwoColumnsBlockContainer style={stackNormalStyle}>
                                <TwoColumnsBlockPadding>
                                    <UserStatsTitle>PATTAYA Statistic</UserStatsTitle>
                                    <StatRowContainer>
                                        <StatsTitleText>Market Cap :</StatsTitleText>
                                        <StatsValueText>N/A</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>Total Minted :</StatsTitleText>
                                        <StatsValueText>{totalSupply?.toLocaleString('en-US',{maximumFractionDigits:0}) ?? 'N/A'}</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>Total Burned :</StatsTitleText>
                                        <StatsValueText>{totalBurn?.toLocaleString('en-US',{maximumFractionDigits:0}) ?? 'N/A'}</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>Total Lock Rewards :</StatsTitleText>
                                        <StatsValueText>{totalLockedUpRewards?.toLocaleString('en-US',{maximumFractionDigits:0}) ?? 'N/A'}</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>Circulating Supply :</StatsTitleText>
                                        <StatsValueText>{totalCirculatingSupply?.toLocaleString('en-US',{maximumFractionDigits:0}) ?? 'N/A'}</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>Max Tx Amount :</StatsTitleText>
                                        <StatsValueText>N/A</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>New PATTAYA/Block :</StatsTitleText>
                                        <StatsValueText>{emissionRate}</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>Transfer Tax :</StatsTitleText>
                                        <StatsValueText>{taxRate ? `${(taxRate?.toNumber() / 100)}%` : 'N/A'}</StatsValueText>
                                    </StatRowContainer>
                                </TwoColumnsBlockPadding>
                            </TwoColumnsBlockContainer>
                            <TwoColumnsBlockContainer style={normalStyle}>
                                <TwoColumnsBlockPadding>
                                    <UserStatsTitle>PATTAYA LP Worth</UserStatsTitle>
                                    <StatRowContainer>
                                        <StatsTitleText>PATTAYA-BNB</StatsTitleText>
                                        <StatsValueText>N/A</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>PATTAYA-BUSD</StatsTitleText>
                                        <StatsValueText>N/A</StatsValueText>
                                    </StatRowContainer>
                                </TwoColumnsBlockPadding>
                            </TwoColumnsBlockContainer>
                        </TwoBlocksContainer>

                    </TwoColumnsRowContainer>
                </div>
            </BodyWrapper>
        </>)
};


export default Home
