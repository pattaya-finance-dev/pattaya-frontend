import React from "react";
import styled from "styled-components";

const SVGTimerIcon = styled.svg`
    width: 18px;
    fill: #D136FF;
    animation: 5s ease-in-out 0s infinite normal none running iHsYLL;
    transform: translate3d(0px, 0px, 0px);
    
    @keyframes iHsYLL {
        0% { transform: scale3d(1, 1, 1); }
        10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }
        30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg ); } 
        40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); } 
        100% { transform: scale3d(1, 1, 1); }
    }
`

const TimerIcon = () => (
    <SVGTimerIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z"/>
    </SVGTimerIcon>
)

export default TimerIcon;
