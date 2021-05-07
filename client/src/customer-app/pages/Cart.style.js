import styled from "styled-components";

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

export const OrderList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 5px;
    padding-left: 15px;
    margin-bottom: 10px;

`;
export const OrderItem = styled.li`
    font-size: 18px;
    display: inline-block;
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