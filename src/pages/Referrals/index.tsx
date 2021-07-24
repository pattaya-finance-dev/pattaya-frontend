
import React, {useCallback, useMemo} from 'react'

import styled from "styled-components";

import ConnectWalletButton from 'components/ConnectWalletButton'

import {useActiveWeb3React} from "../../hooks";
import { encrypt } from '../../utils/cryptography';
import {useReferralsCommission, useReferralsCount} from "../../state/referral/hooks";
import {useToken} from "../../hooks/Tokens";
import {PATTAYA, PINNED_PAIRS} from "../../constants";


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
    border: 5px solid #FFCE02;
    border-radius: 25px;
    padding-left: 224px;
    padding-right: 224px;
    box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #FFCE02,
            0 0 0.8rem #FFCE02,
            0 0 2.8rem #FFCE02,
            inset 0 0 1.3rem #FFCE02; 
`;

const headerStyle : React.CSSProperties = {
    textAlign: 'center',
    marginBottom : '35px',
    marginTop: '35px',
    color: '#D136FF',
    fontSize: '24px'
}

const FilterContainer = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 48px;
`

const Container = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 48px;
`

const BodyWrapper = styled.div`

    @media screen and (min-width: 968px)
    { 
        padding-top: 32px;
        padding-bottom: 32px;
    }

    @media screen and (min-width: 576px)
    {
        padding-top: 24px;
        padding-bottom: 24px;
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

const BodyDescriptionText = styled.div`
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 16px;
`

const TwoColumnsContainer = styled.div`
    -webkit-box-align: stretch;
    align-items: stretch;
    justify-content: stretch;
    margin-bottom: 36px;
    
    @media screen and (min-width: 968px) {
        grid-template-columns: repeat(12, 1fr);
        gap: 32px;
    }
    
    @media screen and (min-width: 852px) {
        grid-template-columns: repeat(12, 1fr);
        gap: 24px;
    }
    
    @media screen and (min-width: 576px) {
        grid-template-columns: repeat(8, 1fr);
        gap: 24px;
    }
    
    display: grid;
`

const TwoColumnsBox = styled.div`
    screen and (min-width: 968px) {
        grid-column: span 6 / auto;
    }
    
   @media screen and (min-width: 852px) {
        grid-column: span 6 / auto;
   } 
   
   @media screen and (min-width: 576px) {
        grid-column: span 4 / auto;
   }
   
   width: 100%;
   
    background-color: #707070;
    border-radius: 32px;
    box-shadow: rgb(25 19 38 / 10%) 0px 2px 12px -8px, rgb(25 19 38 / 5%) 0px 1px 1px;
    color: rgb(255, 255, 255);
    overflow: hidden;
    position: relative;
   
`

const TwoColumnsItemHeaderContainer = styled.div`
    border-bottom: 1px solid rgb(82, 75, 99);
    padding: 24px;
`

const TwoColumnsItemHeader = styled.div`
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
`


const TwoColumnsItemBodyContainer = styled.div`
    padding: 24px;
`

const TwoColumnsItemBody = styled.div`
    line-height: 1.2;
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 600;
`

const TwoColumnsItem = styled.div`

    @media screen and (min-width: 968px) {
        grid-column: span 6 / auto;
    }

    @media screen and (min-width: 852px) {
        grid-column: span 6 / auto;
    }
    
    @media screen and (min-width: 576px) {
        grid-column: span 4 / auto;
    }
    
    grid-column: span 6 / auto;
    width: 100%;

    background-color: #262626;
    border-radius: 32px;
    box-shadow: rgb(25 19 38 / 10%) 0px 2px 12px -8px, rgb(25 19 38 / 5%) 0px 1px 1px;
    color: rgb(255, 255, 255);
    overflow: hidden;
    position: relative;
`

const ColumnItem = styled.div`
    background-color: #262626;
    border-radius: 32px;
    box-shadow: rgb(25 19 38 / 10%) 0px 2px 12px -8px, rgb(25 19 38 / 5%) 0px 1px 1px;
    color: rgb(255, 255, 255);
    overflow: hidden;
    position: relative;
}
`

const ColumnItemHeaderContainer = styled.div`
    border-bottom: 1px solid rgb(82, 75, 99);
    padding: 24px;
`

const ColumnItemHeader = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
`

const HeaderText = styled.div`
    color: rgb(255, 255, 255);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
`

const HeaderButton = styled.button`
    -webkit-box-align: center;
    align-items: center;
    background-color: transparent;
    border: 2px solid rgb(255, 114, 13);
    border-radius: 16px;
    box-shadow: none;
    color: rgb(255, 114, 13);
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

const ItemLinkText = styled.a`
    align-self: center;
    margin: 0px auto;
    word-break: break-all;
    padding: 16px 0px;
    color: #D136FF
`

const UnlockBoxContainer = styled.div`
    text-align: center;
    background-color: #262626;
    border-radius: 32px;
    box-shadow: rgb(25 19 38 / 10%) 0px 2px 12px -8px, rgb(25 19 38 / 5%) 0px 1px 1px;
    color: rgb(255, 255, 255);
    overflow: hidden;
    position: relative;
`

const UnlockBox = styled.div`
    padding: 36px 24px;
`

const UnlockButton = styled.button`
    -webkit-box-align: center;
    align-items: center;
    background-color: #D136FF;
    border: 0px;
    border-radius: 16px;
    box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px inset;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    width: max-content;
    height: 48px;
    line-height: 1;
    letter-spacing: 0.03em;
    -webkit-box-pack: center;
    justify-content: center;
    outline: 0px;
    padding: 0px 24px;
    transition: background-color 0.2s ease 0s;
    opacity: 1;
`

const UnLockText = styled.div`
    color: #D136FF;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    margin-top: 24px;
`

const Referrals = () => {

        const { account } = useActiveWeb3React()
        const pattaya = useToken(PATTAYA.address);

        const refUrl = useMemo(() => {
           if(account) {
               return encrypt(account).content;
           }

           return undefined;
        },[account])

        const referralCount = useReferralsCount(account ?? undefined);
        const referralCommission = useReferralsCommission(pattaya ?? undefined, account ?? undefined);

    const onCopyClick = useCallback(() => {
            const url = `${window.location.origin}/?ref=${refUrl}`;
            navigator.clipboard.writeText(url);
        },[refUrl])

        return (
            <>
                <HeaderWrapper>
                    <BorderWrapper>
                        <h1 color="primary" style={headerStyle}>PattayaSwap Referral Program</h1>
                        <BodyDescriptionText>
                            Share the referral link below to invite your friends and earn 1% of your friend&#8217;s earnings FOREVER!
                        </BodyDescriptionText>
                    </BorderWrapper>
                </HeaderWrapper>

                <BodyWrapper>
                    <div>
                        { account ?
                            <>
                            <TwoColumnsContainer>
                                <TwoColumnsItem>
                                    <TwoColumnsItemHeaderContainer>
                                        <TwoColumnsItemHeader>
                                            Total Referrals
                                        </TwoColumnsItemHeader>
                                    </TwoColumnsItemHeaderContainer>
                                    <TwoColumnsItemBodyContainer>
                                        <TwoColumnsItemBody>
                                            {referralCount.toString()}
                                        </TwoColumnsItemBody>
                                    </TwoColumnsItemBodyContainer>
                                </TwoColumnsItem>
                                <TwoColumnsItem>
                                    <TwoColumnsItemHeaderContainer>
                                        <TwoColumnsItemHeader>
                                            Total Referral Commissions
                                        </TwoColumnsItemHeader>
                                    </TwoColumnsItemHeaderContainer>
                                    <TwoColumnsItemBodyContainer>
                                        <TwoColumnsItemBody>
                                            {referralCommission.toSignificant()} PATTAYA
                                        </TwoColumnsItemBody>
                                    </TwoColumnsItemBodyContainer>
                                </TwoColumnsItem>
                            </TwoColumnsContainer>
                            <ColumnItem>
                                <ColumnItemHeaderContainer>
                                    <ColumnItemHeader>
                                        <HeaderText>
                                            Your Referral Link
                                        </HeaderText>
                                        <HeaderButton onClick={onCopyClick}>
                                            Copy
                                        </HeaderButton>
                                    </ColumnItemHeader>
                                </ColumnItemHeaderContainer>
                                <div style={{padding: '24px'}}>
                                    <ItemLinkText target='_blank' href={`/?ref=${refUrl}`}>
                                        {window.location.origin}/?ref={refUrl}
                                    </ItemLinkText>
                                </div>
                            </ColumnItem>
                            </>
                            :
                            <UnlockBoxContainer>
                               <UnlockBox>
                                   <ConnectWalletButton>Unlock Wallet</ConnectWalletButton>
                                   <UnLockText>Unlock wallet to get your unique referral link</UnLockText>
                               </UnlockBox>
                            </UnlockBoxContainer>
                        }
                    </div>
                </BodyWrapper>
            </>)
};


export default Referrals
