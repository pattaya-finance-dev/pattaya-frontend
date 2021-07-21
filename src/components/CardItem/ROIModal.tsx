import React, {useCallback} from 'react'
import { Modal } from '@pattayaswap-dev-libs/uikit'
import styled from "styled-components";
import LinkICON from "../Icons/LinkIcon";

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

const ROIRemarkContainer = styled.div`
    max-width: 320px;
    margin-bottom: 28px;

    color: #D136FF;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
`

const ROILinkContainer = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
`

const ROILinkText = styled.a`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: fit-content;
    
    color: #D136FF;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    
    text-decoration: none;
`

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const ROIModal = ({ onDismiss = defaultOnDismiss }: SettingsModalProps) => {

    const onGetLink = useCallback( e => { onDismiss() }, [onDismiss] )
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
                        0.77%
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        131.39
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        7d
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        0.56%
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        436.5
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        30d
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        11.44%
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        1950.89
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        365d(APY)
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        273.40%
                    </ROITableCol>
                </div>
                <div>
                    <ROITableCol>
                        46637.33
                    </ROITableCol>
                </div>
            </ROITableContainer>
            <ROIRemarkContainer>
                Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.
            </ROIRemarkContainer>
            <ROILinkContainer>
                <ROILinkText href='#/pool' onClick={onGetLink}>
                    GET PATTAYA
                </ROILinkText>
                <LinkICON/>
            </ROILinkContainer>
        </Modal>
    )
}

export default ROIModal
