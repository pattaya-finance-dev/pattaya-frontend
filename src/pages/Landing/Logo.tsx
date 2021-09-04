import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LogoIcon, LogoWithText } from "./Svg";

interface Props {
  isDark: boolean;
  href: string;
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 246px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`;

const FlexBox = styled.div`
    display: flex
`

const Logo: React.FC<Props> = ({ isDark, href }) => {
  const isAbsoluteUrl = href.startsWith("http");
  const innerLogo = (
    <>
      <LogoIcon className="mobile-icon" />
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  );

  return (
    <FlexBox>
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Panther home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={href} aria-label="Panther home page">
          {innerLogo}
        </StyledLink>
      )}
    </FlexBox>
  );
};

export default Logo;
