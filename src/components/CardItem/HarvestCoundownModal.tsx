import React, {useEffect, useMemo, useState} from 'react'
import { Modal } from '@pattayaswap-dev-libs/uikit'

import styled from "styled-components";
import moment from 'moment';
import {BigNumber} from "@ethersproject/bignumber";

type HarvestModalProps = {
    lockUpHour: number | null
    tokenName: string
    nextHarvestUntil: BigNumber
    onDismiss?: () => void
}

const CountDownTextContainer = styled.div`
    text-align: center;
    color: #D136FF;
    font-size: 36px;
    font-weight: 600;
    line-height: 1.5;
`

const DisabledTextContainer = styled.div`
    text-align: center;
    color: rgb(102, 97, 113);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    margin-top: 10px; 
`

const defaultOnDismiss = () => null

const HarvestCountdownModal = ({ lockUpHour, tokenName, nextHarvestUntil , onDismiss = defaultOnDismiss }: HarvestModalProps) => {

    const convertTimeHarvest = (nextHarvestUntilInput) => {
        const durationNum = moment.unix(nextHarvestUntilInput.toNumber()).diff(moment());
        const duration = moment.duration(durationNum);
        return `${duration.hours().toString().padStart(2,'0')}:${duration.minutes().toString().padStart(2,'0')}:${duration.seconds().toString().padStart(2,'0')}`
    }
    const [harvestText, setHarvestText] = useState<string>(convertTimeHarvest(nextHarvestUntil))


    useEffect(() => {
        const interval = setInterval(() => {
            setHarvestText(convertTimeHarvest(nextHarvestUntil))
        }, 1000);
        return () => clearInterval(interval);
    }, [nextHarvestUntil]);

    return (
        <Modal title="Harvest In" onDismiss={onDismiss}>
            <CountDownTextContainer>
                {harvestText}
            </CountDownTextContainer>
            <DisabledTextContainer>
                Pool: {tokenName}
            </DisabledTextContainer>
            <DisabledTextContainer>
                Harvest Lockup: {lockUpHour ?? 'N/A'} Hour(s)
            </DisabledTextContainer>
        </Modal>
    )
}

export default HarvestCountdownModal
