import styled from "styled-components";
import { device } from "../../shared/components/device";

export const Container = styled.div`
    height: 100vh;
    width: 40%;
    position: relative;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    display: flex;

    margin: 0;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
`;

export const Division = styled.div`
    max-height: 20%;
    flex: 2;
    overflow-y: auto;
    display: flex;
    justify-content: space-between;
`;

export const LeftWrapper = styled.div`
`;

export const RightWrapper = styled.div`
`;

export const Status = styled.h1`
    text-aligned: left;
    font-size: 26px;
    font: roboto (to be changed);
    margin-top: 10%;
    margin-bottom: 5%;
    
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
`;

export const OrderPrice = styled.li`
    font-size: 18px;
    display: inline-block;
`;

export const BreakLine = styled.hr`
    min-width: 100%;
    border: 0.8px solid #B9B9B9;

`;

export const DivisionBottom = styled.div`
    max-height: 10%;
    flex: 2;
    overflow-y: auto;
    display: flex;
    justify-content: space-between;
`;

export const Total = styled.h2`
    font-size: 15px;
    text-align: right;
`;

export const TotalPrice = styled.h2`
    font-size: 18px;
    text-align: right;
`;

export const Logo = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 70px;
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