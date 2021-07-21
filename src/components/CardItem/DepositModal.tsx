import React, {useCallback, useMemo, useState} from 'react'

import { Modal } from '@pattayaswap-dev-libs/uikit'

import styled from "styled-components";
import {Currency, CurrencyAmount, JSBI, Token, TokenAmount} from "@pattayaswap-dev-libs/sdk";


const TokenAvailalableContainer = styled.div`
    -webkit-box-align: center;
    align-items: center;
    color: #D136FF;
    display: flex;
    font-size: 14px;
    font-weight: 700;
    height: 44px;
    -webkit-box-pack: end;
    justify-content: flex-end;
`

const DepositInputContainer = styled.div`
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(72, 63, 59);
    border-radius: 16px;
    display: flex;
    height: 72px;
    padding: 0px 16px;
`

const DepositInput = styled.input`
    width: 100%;
    background: none;
    border: 0px;
    color: #FFFFFF;
    font-size: 18px;
    flex: 1 1 0%;
    height: 56px;
    margin: 0px;
    padding: 0px;
    outline: none;
`

const DepositInputCurrencyContainer = styled.div`
    -webkit-box-align: center;
    align-items: center;
    display: flex;
`

const DepositInputCurrency = styled.span`
    color: #D136FF;
    font-weight: 700;
`

const MaxButton = styled.button`
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

const DepositActionButtonContainer = styled.div`
    -webkit-box-align: center;
    align-items: center;
    background-color: rgba(217, 91, 0, 0);
    display: flex;
    margin: 0px;
    padding: 24px;
`

const ActionButtonContainer = styled.div`
    flex: 1 1 0%;
    text-align: center;
`

const ActionButton = styled.button`
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

const ActionDisabled = styled.button`
    background-color: rgb(60, 55, 66);
    border-color: rgb(60, 55, 66);
    box-shadow: none;
    color: rgb(102, 97, 113);
    cursor: not-allowed;
    
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
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

const ActionCancelButton =styled.button`
    -webkit-box-align: center;
    align-items: center;
    background-color: transparent;
    border: 2px solid #D136FF;
    border-radius: 16px;
    box-shadow: none;
    color: #D136FF;
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

const DepositFeeContainer = styled.div`
    -webkit-box-align: center;
    align-items: center;
    color: #D136FF;
    display: flex;
    font-size: 14px;
    font-weight: 700;
    height: 44px;
    -webkit-box-pack: end;
    justify-content: flex-end;
`

const defaultOnDismiss = () => null

const DepositModal = ({ title, balance, onDismiss = defaultOnDismiss, onAdd, depositFeePercent }:
  {
    title: string
    balance?: CurrencyAmount
    onDismiss?: () => void
    onAdd: (string) => void
    depositFeePercent?: number
  }) => {

    const [inputAmount, setInputAmount] = useState('');
    const [isPending, setIsPending] = useState(false);

    const currencyName = balance !== undefined ? balance.currency.name : 'N/A';
    const currencyAvailable = balance !== undefined ? balance.toFixed(2) : 0;

    const onMaxClick = useCallback(() => { if(balance !== undefined) setInputAmount(balance.toSignificant().toString())}, [balance])

    const onDepositClick = useCallback(() => {
        setIsPending(true)
        console.log(parseValue(inputAmount))
        onAdd(parseValue(inputAmount))
    },[inputAmount, onAdd]);

    console.log(onDepositClick);

    const depositFee = useMemo(() => {
        const input = parseFloat(inputAmount)
        return depositFeePercent !== undefined ? (input * depositFeePercent / 100) : 0
    },[depositFeePercent,inputAmount])

    const parseValue = (input) => {
       return JSBI.BigInt(parseFloat(input) * 10**18).toString();
    }

    return (
        <Modal title={title} onDismiss={onDismiss}>
            <TokenAvailalableContainer>
                {currencyAvailable} {currencyName} Available
            </TokenAvailalableContainer>
            <DepositInputContainer>
                <DepositInput placeholder='0' value={inputAmount} onChange={e => setInputAmount(e.target.value)}/>
                <DepositInputCurrencyContainer>
                    <DepositInputCurrency>
                        {currencyName}
                    </DepositInputCurrency>
                    <div style={{ width: '16px' }}/>
                    <div>
                        <MaxButton type='button' onClick={onMaxClick} >Max</MaxButton>
                    </div>
                </DepositInputCurrencyContainer>
            </DepositInputContainer>
            { depositFee > 0 ?
                <DepositFeeContainer>
                    Deposit Fee: {depositFee.toFixed(6)} {currencyName}
                </DepositFeeContainer>
                : null
            }
            <DepositActionButtonContainer>
                <ActionButtonContainer>
                    <ActionCancelButton type='button' onClick={onDismiss} >Cancel</ActionCancelButton>
                </ActionButtonContainer>
                <div style={{height:'24px', width:'24px'}}/>
                { isPending ?
                <ActionButtonContainer>
                        <ActionDisabled type='button'>Pending Confirmation</ActionDisabled>
                </ActionButtonContainer>
                    :
                <ActionButtonContainer>
                    <ActionButton type='button' onClick={onDepositClick}>Confirm</ActionButton>
                </ActionButtonContainer>
                }
            </DepositActionButtonContainer>
        </Modal>
    )
}

export default DepositModal
