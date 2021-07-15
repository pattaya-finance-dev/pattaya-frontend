import React from 'react'
import { Modal } from '@pattayaswap-dev-libs/uikit'
import styled from "styled-components";

type SettingsModalProps = {
    onDismiss?: () => void
}

const ROITableContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, auto);
    margin-bottom: 24px;
`

const ROITableHeaderCol = styled.div`
    color: #D136FF;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.5;
    text-transform: uppercase;
    margin-bottom: 20px;
`

const ROITableCol = styled.div`
    color: rgb(255, 255, 255);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
`

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const ROIModal = ({ onDismiss = defaultOnDismiss }: SettingsModalProps) => {
    return (
        <Modal title="ROI" onDismiss={onDismiss}>
            <ROITableContainer>
               <div>
                   <ROITableHeaderCol>
                       Timeframe
                   </ROITableHeaderCol>
               </div>
                <div>
                    <ROITableHeaderCol>
                        ROI
                    </ROITableHeaderCol>
                </div>
                <div>
                    <ROITableHeaderCol>
                        PATTAYA PER $1000
                    </ROITableHeaderCol>
                </div>
                <div>
                    <ROITableCol>
                       1d
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        0.77
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        131.39
                    </ROITableCol>
                </div>
            </ROITableContainer>
        </Modal>
    )
}

export default ROIModal
