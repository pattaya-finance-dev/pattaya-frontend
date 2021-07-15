
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Button, useModal } from '@pattayaswap-dev-libs/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'

import styled from "styled-components";
import QuestionHelper from "../QuestionHelper";
import {ApprovalState} from "../../hooks/useApproveCallback";
import {Dots} from "../../pages/Pool/styleds";
import {Field} from "../../state/mint/actions";
import SettingsModal from "../PageHeader/SettingsModal";
import ROIModal from "./ROIModal";

const CardItemContainer = styled.div`
    align-self: baseline;
    background: rgb(18, 24, 39);
    border-radius: 32px;
    box-shadow: rgb(25 19 38 / 10%) 0px 2px 12px -8px, rgb(25 19 38 / 5%) 0px 1px 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 24px;
    position: relative;
    text-align: center;
    
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0px 8px 32px;
`;

const CardAura = styled.div`
    filter: blur(6px);
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    z-index: -1;
    background: linear-gradient(45deg, 
                #E75FDB 0%, 
                #C449E8 10%, 
                #B75BD3 20%, 
                #A464B7 30%, 
                #825A8E 40%, 
                #67506E 50%, 
                #493E4D 60%, 
                #312D33 70%, 
                #1C1C1C 80%, 
                #1F1E1F 90%, 
                #191919 100%) 0% 0% / 300% 300%;
    
    @keyframes ilqnTz {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    animation: 2s linear 0s infinite normal none running ilqnTz; 
    
    border-radius: 16px;
`

const ContentHeader = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 12px;
`

const HeaderICON = styled.div`
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 64px;
    max-width: 80px;
    max-height: 64px;
    width: 100%;
    padding-top: 0%;
`

const HeaderImg = styled.img`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    max-width: 100%;
`

const HeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const HeaderTitleText = styled.h2`
    font-size: 20px;
    font-weight: 600;
    line-height: 1.1;
    margin-bottom: 8px;
    color: rgb(255, 255, 255);
`

const HeaderTitleBadge = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
`

const ICONBadge = styled.div`
    -webkit-box-align: center;
    align-items: center;
    background-color: transparent;
    border: 2px solid rgb(104, 207, 41);
    border-radius: 16px;
    color: rgb(104, 207, 41);
    display: inline-flex;
    font-size: 14px;
    font-weight: 400;
    height: 28px;
    line-height: 1.5;
    padding: 0px 8px;
    white-space: nowrap;
`

const NOFeesIcon = () => (
    <svg style={{marginRight: '0.25rem',fill: 'rgb(104, 207, 41)'}} viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" >
        <path
            d="M23 12L20.56 9.21L20.9 5.52L17.29 4.7L15.4 1.5L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5L3.44 9.2L1 12L3.44 14.79L3.1 18.49L6.71 19.31L8.6 22.5L12 21.03L15.4 22.49L17.29 19.3L20.9 18.48L20.56 14.79L23 12ZM9.38 16.01L7 13.61C6.61 13.22 6.61 12.59 7 12.2L7.07 12.13C7.46 11.74 8.1 11.74 8.49 12.13L10.1 13.75L15.25 8.59C15.64 8.2 16.28 8.2 16.67 8.59L16.74 8.66C17.13 9.05 17.13 9.68 16.74 10.07L10.82 16.01C10.41 16.4 9.78 16.4 9.38 16.01Z"/>
    </svg>
)

const MultiplyBadge = styled.div`
    margin-left: 4px;
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(209, 54, 255);
    border: 2px solid rgb(209, 54, 255);
    border-radius: 16px;
    color: rgb(255, 255, 255);
    display: inline-flex;
    font-size: 14px;
    font-weight: 400;
    height: 28px;
    line-height: 1.5;
    padding: 0px 8px;
    white-space: nowrap;
`

const ContentRow = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 4px;
}
`

const ContentField = styled.div`
    color: rgb(255, 255, 255);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
`

const ContentValue = styled.div`
    display: flex;
    align-items: center;
    
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
`

const ContentLink = styled.a`
    text-decoration: none;
    font-weight: normal;
    color: rgb(255, 255, 255);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
`

const ContentLinkICONStyle :React.CSSProperties  =
    {
        paddingLeft: '4px',
        height: '18px',
        width: 'auto',
        fill: '#D136FF'
    }

const ContentLinkICON = () => (
    <svg viewBox="0 0 24 24" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" style={ContentLinkICONStyle} >
        <path
            d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"/>
    </svg>
)



const CalculatorButton = styled.button`
    -webkit-box-align: center;
    align-items: center;
    background-color: transparent;
    border: 0px;
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
    margin-left: 4px;
`

const CalculatorIcon = () => (
    <svg style={{fill:'rgb(255, 255, 255)', flexShrink: 0}} viewBox="0 0 25 24" color="text" width="20px"
         xmlns="http://www.w3.org/2000/svg" className="sc-bdfBwQ dhaIlc">
        <path
            d="M19.2 3H5.19995C4.09995 3 3.19995 3.9 3.19995 5V19C3.19995 20.1 4.09995 21 5.19995 21H19.2C20.3 21 21.2 20.1 21.2 19V5C21.2 3.9 20.3 3 19.2 3ZM19.2 19H5.19995V5H19.2V19Z"
            fill="#1FC7D4"/>
        <path d="M11.45 7.72021H6.44995V9.22022H11.45V7.72021Z" fill="#1FC7D4"/>
        <path d="M18.2 15.75H13.2V17.25H18.2V15.75Z" fill="#1FC7D4"/>
        <path d="M18.2 13.25H13.2V14.75H18.2V13.25Z" fill="#1FC7D4"/>
        <path
            d="M8.19995 18H9.69995V16H11.7V14.5H9.69995V12.5H8.19995V14.5H6.19995V16H8.19995V18Z"
            fill="#1FC7D4"/>
        <path
            d="M14.29 10.95L15.7 9.54L17.11 10.95L18.17 9.89L16.76 8.47L18.17 7.06L17.11 6L15.7 7.41L14.29 6L13.23 7.06L14.64 8.47L13.23 9.89L14.29 10.95Z"
            fill="#1FC7D4"/>
    </svg>)

const ActionContainer = styled.div`
    padding-top: 16px;
`

const ActionEarn = styled.div`
    display: flex;
`

const ActionEarnText = styled.div`
    color: #D136FF;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.5;
    text-transform: uppercase;
`

const ActionHarvestContainer = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 8px;
`

const ActionHarvestAmountText = styled.div`
    font-size: 20px;
    font-weight: 600;
    line-height: 1.1;
    color: rgb(102, 97, 113);
`

const ActionHarvestButtonContainer = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: column;
`

const CardItemContentSeparator = styled.div`
    background-color: rgb(82, 75, 99);
    height: 1px;
    margin: 28px auto;
    width: 100%;
`

const CardMoreDetailsButton = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
`

const CardMoreDetailsText = styled.div`
    color: #D136FF;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
`

const CardMoreDetails = styled.div`
    height: 100%;
    overflow: hidden;
`

const CommonLinkContainer = styled.div`
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
`

const CommonLink = styled.a`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: fit-content;
    color: #D136FF;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    text-decoration: none; 
`


const onClick = () => {
    console.log('TEST')
}

const ChevronIcon = ({ isUp }) => (
    !isUp ? <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" style={{fill: '#D136FF'}}>
            <path
            d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"/>
           </svg>
    : <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg"  style={{fill: '#D136FF'}}>
    <path d="M8.11997 14.7101L12 10.8301L15.88 14.7101C16.27 15.1001 16.9 15.1001 17.29 14.7101C17.68 14.3201 17.68 13.6901 17.29 13.3001L12.7 8.7101C12.31 8.3201 11.68 8.3201 11.29 8.7101L6.69997 13.3001C6.30997 13.6901 6.30997 14.3201 6.69997 14.7101C7.08997 15.0901 7.72997 15.1001 8.11997 14.7101Z"/>
    </svg>
)

const CardItem = () => {

    const [isShowDetails, setIsShowDetails] = useState<boolean>(false)
    const onDetailsToggle = useCallback(() => { setIsShowDetails(!isShowDetails) }, [isShowDetails])
    const [onPresentRoi] = useModal(<ROIModal />)

    return  (
        <>
            <CardItemContainer>
                <CardAura/>
                <ContentHeader>
                    <HeaderICON>
                        <HeaderImg src="/images/pairs/pattaya_wbnb.png" alt="PATTAYA" />
                    </HeaderICON>
                    <HeaderTitle>
                        <HeaderTitleText>PATTAYA-BNB LP</HeaderTitleText>
                        <HeaderTitleBadge>
                            <ICONBadge>
                                <NOFeesIcon/>
                                No Fees
                            </ICONBadge>
                            <MultiplyBadge>40X</MultiplyBadge>
                        </HeaderTitleBadge>
                    </HeaderTitle>
                </ContentHeader>
                <ContentRow>
                    <ContentField>APR:</ContentField>
                    <ContentValue>
                        <CalculatorButton type="button" onClick={onPresentRoi}>
                            <CalculatorIcon />
                        </CalculatorButton>
                        280.12%
                    </ContentValue>
                </ContentRow>
                <ContentRow>
                    <ContentField>Earn:</ContentField>
                    <ContentValue>
                        PATTAYA
                    </ContentValue>
                </ContentRow>
                <ContentRow>
                    <ContentField>Deposit Fee:</ContentField>
                    <ContentValue>
                        0%
                    </ContentValue>
                </ContentRow>
                <ContentRow>
                    <ContentField>Harvest Lockup:
                    <QuestionHelper text='How soon can you harvest or compound again.' />
                    </ContentField>
                    <ContentValue>
                        2 Hour(s)
                    </ContentValue>
                </ContentRow>
                <ContentRow>
                    <ContentField>LP Type:</ContentField>
                    <ContentValue>
                       PATTAYA-LP
                    </ContentValue>
                </ContentRow>
                <ActionContainer>
                    <ActionEarn>
                        <ActionEarnText style={{ marginBottom: '8px', color:'#ffffff', paddingRight: '3px'}}>PATTAYA</ActionEarnText>
                        <ActionEarnText>EARNED</ActionEarnText>
                    </ActionEarn>
                </ActionContainer>
                <ActionHarvestContainer>
                       <ActionHarvestAmountText>0</ActionHarvestAmountText>
                       <ActionHarvestButtonContainer>
                           <Button onClick={onClick} disabled >
                               Harvest
                           </Button>
                       </ActionHarvestButtonContainer>
                </ActionHarvestContainer>
                <ActionContainer>
                    <ActionEarn>
                        <ActionEarnText style={{ marginBottom: '8px', color:'#ffffff', paddingRight: '3px'}}>PATTAYA-BNB LP</ActionEarnText>
                        <ActionEarnText>STAKED</ActionEarnText>
                    </ActionEarn>
                </ActionContainer>
                <ConnectWalletButton fullWidth />
                <CardItemContentSeparator />
                <CardMoreDetailsButton onClick={onDetailsToggle}>
                    <CardMoreDetailsText>{isShowDetails ? 'Hide' : 'Details'}</CardMoreDetailsText>
                    <ChevronIcon isUp={isShowDetails} />
                </CardMoreDetailsButton>
                <CardMoreDetails style={ !isShowDetails ? { display: 'none' } : {}}>
                    <div style={{marginTop:'24px'}} />
                    <ContentRow>
                        <ContentField>Deposit:</ContentField>
                        <ContentLink href="/test_link">
                            PATTAYA-BNB LP
                            <ContentLinkICON/>
                        </ContentLink>
                    </ContentRow>
                    <ContentRow>
                        <ContentField>Total Liquidity:</ContentField>
                        <ContentValue style={{fontWeight: 'normal'}}>
                           $3,751,178
                        </ContentValue>
                    </ContentRow>
                    <ContentRow>
                        <ContentField>LP Worth:</ContentField>
                        <ContentValue style={{fontWeight: 'normal'}}>
                            $0.73
                        </ContentValue>
                    </ContentRow>
                    <CommonLinkContainer>
                        <CommonLink target='_blank' href='https://bscscan.com/token/0x9287f5ad55d7ee8eae90b865718eb9a7cf3fb71a'>
                            View on BscScan
                        </CommonLink>
                    </CommonLinkContainer>
                </CardMoreDetails>
            </CardItemContainer>
        </>
    )
}

export default CardItem
