
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import styled from "styled-components";


const toggleInputStyle : React.CSSProperties = {
    cursor: 'pointer',
    opacity: 0,
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 3
}


const toggleTextStyle : React.CSSProperties = {
    marginLeft: '8px',
    color: 'rgb(255, 255, 255)',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.5',
}

const toggleButtonStyle : React.CSSProperties = {
    backgroundColor: 'rgb(18, 24, 39)',
    borderRadius: '50%',
    cursor: 'pointer',
    height: '32px',
    left: '4px',
    position: 'absolute',
    top: '4px',
    transition: 'left 200ms ease-in 0s',
    width: '32px',
    zIndex: 1,
}

const toggleButtonActiveStyle : React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    cursor: 'pointer',
    height: '32px',
    left: 'calc(100% - 36px)',
    position: 'absolute',
    top: '4px',
    transition: 'left 200ms ease-in 0s',
    width: '32px',
    zIndex: 1,
}


const ToggleContainer = styled.div`
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 32px;
`;

const ToggleBody = styled.div`
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(72, 63, 59);
    border-radius: 24px;
    box-shadow: rgb(74 74 104 / 10%) 0px 2px 2px -1px inset;
    cursor: pointer;
    display: inline-flex;
    height: 40px;
    position: relative;
    transition: background-color 200ms ease 0s;
    width: 72px;
`

const ToggleButton = () => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const toggleIsActive = useCallback(() => { setIsActive(!isActive) }, [isActive])

    return  (
        <>
            <ToggleContainer>
                <ToggleBody style={isActive ? { backgroundColor : '#D136FF'} : {}}>
                    <input type="checkbox" style={toggleInputStyle} onClick={toggleIsActive}/>
                    <div style={isActive ? toggleButtonActiveStyle : toggleButtonStyle} />
                </ToggleBody>
                <div color="text" style={toggleTextStyle}> Staked only</div>
            </ToggleContainer>
        </>
    )
}

export default ToggleButton
