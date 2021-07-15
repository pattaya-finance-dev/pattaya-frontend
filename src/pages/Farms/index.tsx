
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import styled from "styled-components";

import ToggleButton from "../../components/ToggleButton";
import ToggleTabButton from "../../components/ToggleTabButton";
import Card from "../../components/Card";
import CardItem from "../../components/CardItem";


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
    flex-direction: row;
    justify-content: center;
    border: 5px solid #D136FF;
    border-radius: 25px;
    padding-left: 224px;
    padding-right: 224px;
    box-shadow: 0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #bc13fe,
            0 0 0.8rem #bc13fe,
            0 0 2.8rem #bc13fe,
            inset 0 0 1.3rem #D136FF; 
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

const Farms = () => {
        return (
            <>
                <HeaderWrapper>
                    <BorderWrapper>
                        <h1 color="primary" style={headerStyle}>Stake LP Tokens to Earn PATTAYA</h1>
                    </BorderWrapper>
                </HeaderWrapper>
                <BodyWrapper>
                        <FilterContainer>
                            <ToggleButton/>
                            <ToggleTabButton/>
                        </FilterContainer>
                        <Container>
                            <CardItem />
                        </Container>
                </BodyWrapper>
            </>)
};


export default Farms
