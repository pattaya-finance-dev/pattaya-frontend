
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import styled from "styled-components";
import { Timeline } from 'react-twitter-widgets'

import {Button} from "@pattayaswap-dev-libs/uikit";


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

const headerStyle : React.CSSProperties = {
    textAlign: 'center',
    marginBottom : '35px',
    marginTop: '35px',
    color: '#FFFFFF',
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
    width: 380px;
    position: absolute;
    top: 60px;
`

const PattayaTitle = styled.span`
    text-align: center;
    position: absolute;
    width: 465px;
    color: #ffffff;
    top: 168px;
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



const Home = () => {

        return (
            <>
                <HeaderWrapper>
                    <BorderWrapper>
                        <img src='/images/top_border.png' alt='top_border' style={{height:'104px', maxWidth:'unset'}}/>
                        <PattayaLogo src='/images/pattaya_logo.png' alt='logo_main' />
                        <PattayaTitle>The First Automatic Liquidity Acquisition Yield Farm & AMM on Binance Smart Chain.</PattayaTitle>
                        <img src='/images/bottom_border.png' alt='bottom_border' style={{height:'104px', maxWidth:'unset', marginTop:'24px'}}/>
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
                                        <MetaMaskButton>
                                            +
                                            <MetaMaskIcon width={16} src='/images/metamask.png' />
                                        </MetaMaskButton>
                                    </PattayaTokenICONContainer>
                                    <SubtitleContainer>
                                        <SubtitleText>PATTAYA to Harvest</SubtitleText>
                                        <ValueText>1.005</ValueText>
                                        <SubValueText>~$135.84</SubValueText>
                                        <Button style={{marginTop:'24px'}} onClick={()=>{console.log('test')}} fullWidth>
                                            Harvest All
                                        </Button>
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
                                        <ValueText>38.698</ValueText>
                                        <SubValueText>~$5,230.583</SubValueText>
                                    </SubtitleContainer>
                                </TwoColumnsBlockPadding>
                            </TwoColumnsBlockContainer>
                        </TwoColumnsRowContainer>
                        <TwoColumnsRowContainer>
                            <TwoColumnsBlockContainer style={normalStyle}>
                                <TwoColumnsBlockPadding>
                                    <UserStatsTitle>TVL: Total Value Locked</UserStatsTitle>
                                    <TitleValueText>$30,194,241</TitleValueText>
                                    <SubtitleValueText>Across all Farms and Pools</SubtitleValueText>
                                </TwoColumnsBlockPadding>
                            </TwoColumnsBlockContainer>
                            <TwoColumnsBlockContainer style={normalStyle}>
                                <TwoColumnsBlockPadding>
                                    <UserStatsTitle>Dex Stats</UserStatsTitle>
                                    <StatRowContainer>
                                        <StatsTitleText>Total Liquidity</StatsTitleText>
                                        <StatsValueText>$0</StatsValueText>
                                    </StatRowContainer>
                                    <StatRowContainer>
                                        <StatsTitleText>24H Volume</StatsTitleText>
                                        <StatsValueText>$0</StatsValueText>
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
                                                chrome: 'noheader%20nofooter'
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
                                            <StatsValueText>$18,132,543</StatsValueText>
                                        </StatRowContainer>
                                        <StatRowContainer>
                                            <StatsTitleText>Total Minted :</StatsTitleText>
                                            <StatsValueText>9,158,521</StatsValueText>
                                        </StatRowContainer>
                                        <StatRowContainer>
                                            <StatsTitleText>Total Burned :</StatsTitleText>
                                            <StatsValueText>1,550,510</StatsValueText>
                                        </StatRowContainer>
                                        <StatRowContainer>
                                            <StatsTitleText>Total Lock Rewards :</StatsTitleText>
                                            <StatsValueText>18,154,158</StatsValueText>
                                        </StatRowContainer>
                                        <StatRowContainer>
                                            <StatsTitleText>Circulating Supply :</StatsTitleText>
                                            <StatsValueText>63,678,154</StatsValueText>
                                        </StatRowContainer>
                                        <StatRowContainer>
                                            <StatsTitleText>Max Tx Amount :</StatsTitleText>
                                            <StatsValueText>72,58</StatsValueText>
                                        </StatRowContainer>
                                        <StatRowContainer>
                                            <StatsTitleText>New PATTAYA/Block :</StatsTitleText>
                                            <StatsValueText>75</StatsValueText>
                                        </StatRowContainer>
                                        <StatRowContainer>
                                            <StatsTitleText>Transfer Tax :</StatsTitleText>
                                            <StatsValueText>2.0%</StatsValueText>
                                        </StatRowContainer>
                                    </TwoColumnsBlockPadding>
                                </TwoColumnsBlockContainer>
                                <TwoColumnsBlockContainer style={normalStyle}>
                                    <TwoColumnsBlockPadding>
                                        <UserStatsTitle>PATTAYA LP Worth</UserStatsTitle>
                                        <StatRowContainer>
                                            <StatsTitleText>PATTAYA-BNB</StatsTitleText>
                                            <StatsValueText>$9.533</StatsValueText>
                                        </StatRowContainer>
                                        <StatRowContainer>
                                            <StatsTitleText>PATTAYA-BUSD</StatsTitleText>
                                            <StatsValueText>$0.558</StatsValueText>
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