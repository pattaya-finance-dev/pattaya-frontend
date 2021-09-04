
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useHistory } from "react-router-dom";

import { Button, ButtonVariants } from "@pattayaswap-dev-libs/uikit";

import styled from "styled-components";
import Logo from "./Logo";

const Wrapper = styled.div`
    background-image: url('/images/bg_landing.png');
    background-repeat: repeat-y;
    background-size: contain; 
    width:100%
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
    padding-top: 48px;
    padding-bottom: 48px;
    padding-left: 72px;
    padding-right: 72px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LandingMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Poppins';
    width:100%;
`

const MenuList = styled.div`
    display flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-grow:4;
    margin-left: 16px;
    margin-right: 54px;
    font-family: 'Poppins';
`

const MenuListItem = styled.a`
    color:#ffffff;
    text-transform: uppercase;
    font-family: inherit;
    font-size: 18px;
    font-weight: 600;
`

const HomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
    width:1200px;
`

const HomeContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #ffffff;
    width: 540px;
    
    font-family: 'Poppins';
    font-size: 32px;
    font-weight: 600;
`

const HomeAction = styled.div`
    display: flex;
    flex-direction: row;
    font-family: inherit;
    width:100%;
    gap: 24px;
    margin-top: 36px;
`

const BigLogoImage = styled.img`
    width: 696px;
`

const BigCoinImage = styled.img`
    width: 500px;
`

const SeparateLine = styled.div`
    border-radius: 32px;
    width:200px;
    height:6px;
    border: 3px solid #D136FF;
    background-color: #D136FF;
    filter: drop-shadow(0 0 6px #D752FF);
    margin-top:8px;
`

const TokenomicsContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    color: #ffffff;
    font-family: 'Poppins';
    font-size: 32px;
    font-weight: 600;
    
    margin-top:100px;
    width:1200px;
`

const TokenomicsCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
    gap: 24px;
`

const TokenomicsCard = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    border: 3px solid #D64BFF;
    border-radius: 20px;
    padding: 36px;
    
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 0.8rem #bc13fe, inset 0 0 0.3rem #d136ff;
    
    font-family: 'Poppins';
    font-size: 30px;
    font-weight: 600;
    
    width:420px;
    height: 580px;
`

const TokenomicsCardDesc = styled.div`
    font-family:inherit;
    font-size: 18px;
    font-weight: 500;
    margin-top: 36px;
    text-align: center;
    line-height: 28px;
`

const HowToBuyContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    color: #ffffff;
    font-family: 'Poppins';
    font-size: 32px;
    font-weight: 600;
    
    margin-top:100px;
    width:1200px;
`

const RoadmapBuyContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    color: #ffffff;
    font-family: 'Poppins';
    font-size: 32px;
    font-weight: 600;
    
    margin-top:100px;
    width:1200px;
`

const PartnersContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    color: #ffffff;
    font-family: 'Poppins';
    font-size: 32px;
    font-weight: 600;
    
    margin-top:100px;
    width:1200px;
`

const PartnersRow = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width:100%;
    
    margin-top: 64px;
`

const RoadmapText = styled.div`
    font-family: inherit;
    font-size: 20px;
    font-weight: 500;
    margin-top: 50px;
    text-align: center;
    line-height: 40px;
`

const RoadmapTimeline = styled.div`
    font-family: inherit;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    
    margin-top: 64px;
`

const RoadmapRow = styled.div`
    font-family: inherit;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width:100%;
    
`

const RoadmapItem = styled.div`
    flex:1;
    
    font-family: inherit;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
`

const RoadmapItemSmall = styled.div`
    flex:1;
    
    font-family: inherit;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    line-height: 32px;
`

const RoadmapItemLine = styled.p`
    font-family: inherit;
`

const HowToBuyCard = styled.div`
    margin-top: 42px;
    display: flex;
    flex-direction: row; 
    border: 3px solid #D64BFF;
    border-radius: 20px;
    padding: 36px;
    
    box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe, 0 0 0.8rem #bc13fe, 0 0 0.8rem #bc13fe, inset 0 0 0.3rem #d136ff;
    width:100%;
`

const HowToBuyCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const HowToBuyRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width:100%;
`

const HowToStepText = styled.div`
    color: #ffffff;
    font-family: 'Poppins';
    font-size: 90px;
    font-weight: 600;
    flex:1;
    text-align:center;
`

const HowToImage = styled.div`
    flex:0.7;
    display:flex;
    flex-direction:row;
    justify-content:center;
`

const HowToTitleText = styled.div`
    color: #ffffff;
    font-family: 'Poppins';
    font-size: 20px;
    font-weight: 600;
    flex:1;
    margin-left: 32px;
`

const HowToDescText = styled.div`
    color: #ffffff;
    font-family: 'Poppins';
    font-size: 20px;
    font-weight: 500;
    flex:3;
    line-height:30px;
`

const HowToSeparator = styled.div`
    background-color: #63637F;
    width:4px;
    height:400px;
`

const Footer = styled.div`
    box-shadow: 0px -2px 10px #FFFFFF50;
    margin-top: 138px;
    display: flex;
    flex-direction: row;
    
    justify-content: space-around;
    align-items: center;
    
    height: 100px;
    
    color: #ffffff;
    background-color: #000118;
    width:100%;
    
    font-family: 'Poppins';
    font-size: 20px;
    font-weight: 600;
`

const JoinCommunityBox = styled.div`
    font-family:inherit;
    display: flex;
    flex-direction:row;
    justify-content:space-between; 
    align-items:center;
    width:350px;
`

const Landing = () => {

    const history = useHistory();

    const onClickLaunch = () => {
        history.push('/home')
    }

    const onClickBuy = () => {
        const pancakeUrl = 'https://pancakeswap.finance/swap'
        window.open(pancakeUrl, '_blank');
    }

    return (
        <Wrapper>
        <BodyWrapper>
            <LandingMenu>
                <Logo
                    isDark={false}
                    href="/"
                />
                <MenuList>
                    <MenuListItem href='#home_tag'>Home</MenuListItem>
                    <MenuListItem href='#about_tag'>About</MenuListItem>
                    <MenuListItem href='#tokenomics_tag'>Tokenomics</MenuListItem>
                    <MenuListItem href='#how_to_buy_tag'>How To Buy?</MenuListItem>
                    <MenuListItem href='#roadmap_tag'>Roadmap</MenuListItem>
                    <MenuListItem href='#partners_tag'>Partners</MenuListItem>
                </MenuList>
                <Button onClick={onClickLaunch} style={{fontSize:'18px'}}>Launch app</Button>
            </LandingMenu>
            <HomeContainer id='home_tag'>
                <HomeContent>
                    <div style={{fontFamily:'inherit', lineHeight:'56px'}}>
                        <p style={{fontFamily:'inherit'}}>Pattaya’s Token and</p>
                        <p style={{fontFamily:'inherit'}}>Passive Income Generator</p>
                        <p style={{fontFamily:'inherit'}}>Decentralise Exchange</p>
                    </div>
                    <HomeAction>
                        <Button onClick={onClickLaunch} style={{fontSize:'18px'}}>Launch app</Button>
                        <Button onClick={onClickBuy} variant='tertiary' style={{fontSize:'18px'}}>Buy Pattaya</Button>
                    </HomeAction>
                </HomeContent>
                <BigLogoImage src='/images/pattaya_big_logo.png' />
            </HomeContainer>
            <HomeContainer id='about_tag'>
                <BigCoinImage src='/images/pattaya_big_coin.png' />
                <HomeContent style={{fontSize:'18px', fontWeight:500, lineHeight:'26px'}}>
                    <div style={{fontFamily:'inherit'}}>
                        <div style={{fontFamily:'inherit', fontSize:'28px', fontWeight:600}}>About Pattaya&lsquo;s Token</div>
                        <SeparateLine/>
                    </div>
                    <div style={{fontFamily:'inherit', marginTop:'28px'}}>
                        <div style={{fontFamily:'inherit'}}>Pattaya’s aims at creating cryptocurrency to be used in daily life at the same time generating passive income for holders. Our roadmap will begin using in restaurants, pubs, bars in all major countries in the South-east Asia and expand to the rest of the world.</div>
                        <br/>
                        <div style={{fontFamily:'inherit'}}>With the RFI token technology, token holders are able to earn passive income by just holding the token. 3% of every transaction is distributed equally and transferred to all token holders.</div>
                    </div>
                </HomeContent>
            </HomeContainer>
            <TokenomicsContainer id='tokenomics_tag'>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',fontFamily:'inherit'}}>
                    <div style={{fontFamily:'inherit', fontSize:'28px', fontWeight:600}}>Tokenomics</div>
                    <SeparateLine style={{width:'150px'}}/>
                </div>

                <div style={{marginTop: '42px', fontWeight:500, fontFamily:'inherit', fontSize:'20px', lineHeight:'42px', width:'100%'}}>
                    <p style={{fontFamily:'inherit', textAlign:'center'}}>Max Cap 100,000,000 Tokens
                    </p>
                    <p style={{fontFamily:'inherit', textAlign:'center'}}>100,000 tokens trading limit per transaction. (0.1% of max supply)</p>
                    <p style={{fontFamily:'inherit', textAlign:'center'}}>10% is to reserved for investors and partners (4.5% locked for 6 months after Pre-sales)</p>
                </div>

                <TokenomicsCardContainer>
                    <TokenomicsCard>
                        <div style={{height:'330px'}}>
                        <img alt='5% of Liquidity Pool' style={{width:'300px'}} src='/images/present.png' />
                        </div>
                        <div style={{fontFamily:'inherit'}}>5% of Liquidity Pool</div>
                        <TokenomicsCardDesc>
                            Increase token liquidity by
                            adding 5% to liquidty pool
                        </TokenomicsCardDesc>
                    </TokenomicsCard>
                    <TokenomicsCard>
                        <div style={{height:'330px'}}>
                        <img alt='5% of Liquidity Pool' style={{width:'270px'}} src='/images/present_2.png' />
                        </div>
                        <div style={{fontFamily:'inherit'}}>3% to All Holders</div>
                        <TokenomicsCardDesc>
                            Create passive income
                            to all token holders
                        </TokenomicsCardDesc>
                    </TokenomicsCard>
                    <TokenomicsCard>
                        <div style={{height:'330px'}}>
                        <img alt='5% of Liquidity Pool' style={{width:'340px'}} src='/images/microphone.png' />
                        </div>
                        <div style={{fontFamily:'inherit'}}>2% to Marketing</div>
                        <TokenomicsCardDesc>
                            Build awareness of the project
                            through effective
                            marketing and partnership
                        </TokenomicsCardDesc>
                    </TokenomicsCard>
                </TokenomicsCardContainer>
            </TokenomicsContainer>
            <HowToBuyContainer id='how_to_buy_tag'>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',fontFamily:'inherit'}}>
                    <div style={{fontFamily:'inherit', fontSize:'28px', fontWeight:600}}>How to Buy?</div>
                    <SeparateLine style={{width:'150px'}}/>
                </div>
                <HowToBuyCard>
                    <HowToBuyCol style={{flex:2}}>
                    <HowToBuyRow>
                        <HowToStepText>1</HowToStepText>
                        <HowToImage>
                            <img style={{width:'86.31px'}} alt='binance' src='/images/binance.png' />
                        </HowToImage>
                        <HowToTitleText>Binance</HowToTitleText>
                    </HowToBuyRow>
                    <HowToBuyRow style={{marginTop: '54px'}}>
                        <HowToStepText>2</HowToStepText>
                        <HowToImage>
                            <img style={{width:'86.31px'}} alt='metamask' src='/images/metamask_small.png' />
                        </HowToImage>
                        <HowToTitleText>Metamask</HowToTitleText>
                    </HowToBuyRow>
                    <HowToBuyRow style={{marginTop: '54px'}}>
                        <HowToStepText>3</HowToStepText>
                        <HowToImage>
                            <img style={{width:'86.31px'}} alt='pancakeswap' src='/images/pancakeswap.png'/>
                        </HowToImage>
                        <HowToTitleText>Pancakeswap</HowToTitleText>
                    </HowToBuyRow>
                    </HowToBuyCol>
                    <HowToBuyCol style={{flex:0.5}}>
                        <HowToSeparator/>
                    </HowToBuyCol>
                    <HowToBuyCol style={{flex:2.5}}>
                        <HowToBuyRow>
                            <HowToDescText>Purchase $BNB on Binance.com</HowToDescText>
                            <div style={{height:'90px'}}/>
                        </HowToBuyRow>
                        <HowToBuyRow style={{marginTop: '54px'}}>
                            <HowToDescText>
                                <p style={{fontFamily:'inherit'}}>Send your $BNB to either MetaMask, TrustWallet</p>
                                <p style={{fontFamily:'inherit'}}>or other wallets that support BSC Network</p>
                            </HowToDescText>
                            <div style={{height:'90px'}}/>
                        </HowToBuyRow>
                        <HowToBuyRow style={{marginTop: '54px'}}>
                            <HowToDescText>Swap on PancakeSwap</HowToDescText>
                            <div style={{height:'90px'}}/>
                        </HowToBuyRow>
                    </HowToBuyCol>
                </HowToBuyCard>
            </HowToBuyContainer>
            <RoadmapBuyContainer id='roadmap_tag'>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',fontFamily:'inherit'}}>
                    <div style={{fontFamily:'inherit', fontSize:'28px', fontWeight:600}}>Roadmap</div>
                    <SeparateLine style={{width:'150px'}}/>
                </div>
                <RoadmapText>
                    Our ultimate goals is to become a daily life token. So we are stricty focusing on new partnership with merchant / restaurant / pub / bar and rolling out our hidden gems to facilitate the partners and users.
                </RoadmapText>
                <RoadmapTimeline>
                    <RoadmapRow>
                        <RoadmapItem>Q3 2021</RoadmapItem>
                        <RoadmapItem>Q4 2021</RoadmapItem>
                        <RoadmapItem>Q1 2022</RoadmapItem>
                        <RoadmapItem>Q2-Q4 2022</RoadmapItem>
                    </RoadmapRow>
                    <RoadmapRow style={{marginTop:'45px'}}>
                        <img alt='timelnie' src='/images/timeline.png' style={{width:'1148px',paddingLeft:'48px'}} />
                    </RoadmapRow>
                    <RoadmapRow style={{marginTop:'45px'}}>
                        <RoadmapItem>Start Project</RoadmapItem>
                        <RoadmapItem>Usability</RoadmapItem>
                        <RoadmapItem>Partner</RoadmapItem>
                        <RoadmapItem>Listing</RoadmapItem>
                    </RoadmapRow>
                    <RoadmapRow style={{marginTop:'45px', alignItems:'start'}}>
                        <RoadmapItemSmall>
                            <RoadmapItemLine>Token launch</RoadmapItemLine>
                            <RoadmapItemLine>Fully on social media</RoadmapItemLine>
                            <RoadmapItemLine>Listing on token explorer</RoadmapItemLine>
                            <RoadmapItemLine>(CoingGecko, CMC)</RoadmapItemLine>
                        </RoadmapItemSmall>
                        <RoadmapItemSmall>
                            <RoadmapItemLine>Annoucement of key</RoadmapItemLine>
                            <RoadmapItemLine>Potential Pattaya’s</RoadmapItemLine>
                            <RoadmapItemLine>partners for</RoadmapItemLine>
                            <RoadmapItemLine>token usability</RoadmapItemLine>
                        </RoadmapItemSmall>
                        <RoadmapItemSmall>
                            <RoadmapItemLine>Launch Partnership</RoadmapItemLine>
                            <RoadmapItemLine>Projects</RoadmapItemLine>
                        </RoadmapItemSmall>
                        <RoadmapItemSmall>
                            <RoadmapItemLine>Going mass listed on</RoadmapItemLine>
                            <RoadmapItemLine>Multiple exchanges</RoadmapItemLine>
                            <RoadmapItemLine>To increase reliability</RoadmapItemLine>
                        </RoadmapItemSmall>
                    </RoadmapRow>
                </RoadmapTimeline>
            </RoadmapBuyContainer>
            <PartnersContainer id='partners_tag'>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',fontFamily:'inherit'}}>
                    <div style={{fontFamily:'inherit', fontSize:'28px', fontWeight:600}}>Partners</div>
                    <SeparateLine style={{width:'150px'}}/>
                </div>
                <PartnersRow>
                    <img src='/images/partners/binance.png' alt='partners_binance'/>
                    <img src='/images/partners/bitkub.png' alt='partners_bitkub'/>
                    <img src='/images/partners/stang_pro.png' alt='partners_stang_pro'/>
                    <img src='/images/partners/master_card.png' alt='partners_master_card'/>
                </PartnersRow>
                <PartnersRow>
                    <img src='/images/partners/pancakeswap.png' alt='partners_pancakeswap'/>
                    <img src='/images/partners/pantherswap.png' alt='partners_pantherswap'/>
                    <img src='/images/partners/thai_sec.png' alt='partners_thai_sec'/>
                    <img src='/images/partners/kbank.png' alt='partners_kbank'/>
                </PartnersRow>
            </PartnersContainer>
        </BodyWrapper>
        <Footer>
            <div style={{fontFamily:'inherit'}}>Copyright © 2021 All Rights Reserved.</div>
            <JoinCommunityBox >
                <div style={{fontFamily:'inherit', fontWeight:400}}>Join our community</div>
                <img src='/images/icons/telegram.png' alt='join_telegram'/>
                <img src='/images/icons/twitter.png' alt='join_twitter'/>
            </JoinCommunityBox>
        </Footer>
        </Wrapper>
    )
};


export default Landing
