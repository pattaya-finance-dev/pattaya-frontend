import styled from "styled-components";

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    // background-image: url('/images/arch-${({ theme }) => (theme.isDark ? 'dark' : 'light')}.svg'),
    //   url('/images/left-pancake.svg'), url('/images/right-pancake.svg');
    // background-repeat: no-repeat;
    // background-position: center 420px, 10% 230px, 90% 230px;
    // background-size: contain, 266px, 266px;
    min-height: 90vh;
  }
`

export default BodyWrapper;
