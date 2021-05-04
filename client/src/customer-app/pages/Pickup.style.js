import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
    flex: 1;
    overflow-y: auto;
    display: flex;
    align-items: center;

    margin: 0;
    padding: 0;
`;

export const Centerwrapper = styled.div`
    max-width: 100%;
    margin-top: 10%;
    margin-bottom: 20%;
    margin-left: 33%;
    margin-right: 33%;
    
    @media ${device.tablet} {
        flex: 0 0 60%;
        max-width: 60%;
    }
    
    @media ${device.laptop} {
        flex: 0 0 40%;
        max-width: 40%;
    }
`;

export const LeftWrapper = styled.div`
`;

export const Status = styled.h1`
    text-aligned: center;
    font-size: 26px;
    font: roboto (to be changed);
    margin-bottom: 25px;
    
`;

export const OrderList = styled.ul`
    list-style: none;
    margin: 0;
    padding 5px;
    padding-left: 15px;
    margin-bottom: 10px;

`;
export const OrderItem = styled.li`
    font-size: 18px;
    display: inline-block;
    margin-right: 15px;
    padding: 0;
`;

export const OrderPrice = styled.li`
    font-size: 18px;
    display: inline-block;
`;

export const BreakLine = styled.hr`
    border: 0.8px solid #B9B9B9;
    margin-top: 25px;
    margin-bottom: 25px;
`;

export const DiscountMessage = styled.h2`
    font-size: 15px;
    text-align: left;
`;

export const Logo = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    width: 60px;
    height: 90px;
`;

export const MyButton = styled.button`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;

    background-color: #AAD9CD;
    color: white;
    padding: 7px 14px;
    transition: background 0.5s ease-in-out;
    width: 37%;
    border-radius: 10px;
    border: none;
    &:hover {
        color: black;
        background: #fff;
    }
`;