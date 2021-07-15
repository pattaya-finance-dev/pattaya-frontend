
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import styled from "styled-components";

const ToggleTabContainer = styled.div`
    background-color: rgb(72, 63, 59);
    border-radius: 32px;
    display: inline-flex;
`;

const toggleTabTextStyle : React.CSSProperties = {
    borderRadius: '32px',
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#D136FF',
    border: '0px',
    boxShadow: 'none',
    color: 'rgb(255, 255, 255)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '16px',
    fontWeight: 600,
    width: 'max-content',
    lineHeight: 1,
    letterSpacing: '0.03em',
    justifyContent: 'center',
    outline: '0px',
    padding: '0px 24px',
    transition: 'background-color 0.2s ease 0s',
    opacity: 1
}

const toggleTabInactiveTextStyle : React.CSSProperties = {
    marginLeft: '2px',
    height: '40px',
    padding: '0px 24px',
    borderRadius: '32px',
    backgroundColor: 'transparent',
    color: '#D136FF',

    alignItems: 'center',
    border: '0px',
    boxShadow: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'inherit',
    fontSize: '16px',
    fontWeight: 600,
    width: 'max-content',
    lineHeight: 1,
    letterSpacing: '0.03em',
    justifyContent: 'center',
    outline: '0px',
    transition: 'background-color 0.2s ease 0s',
    opacity: 1
}

const ToggleTabButton = () => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const toggleIsActive = useCallback(() => { setIsActive(!isActive) }, [isActive])

    return  (
        <>
            <ToggleTabContainer>
                <a href="#/farms" style={toggleTabTextStyle}>Active</a>
                <a href="#/farms/history" style={toggleTabInactiveTextStyle}>Inactive</a>
            </ToggleTabContainer>
        </>
    )
}

export default ToggleTabButton
