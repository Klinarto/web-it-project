import styled from "styled-components";

export const Container = styled.div`
  height: 93vh;
  max-width: 70vw;
  position: relative;
  flex: 1;
  flex-direction: column;
  display: flex;

  margin: 0;
  padding: 0;
  margin-left: auto;
  margin-right: 5%;
`;

export const DivisionTop = styled.div`
  max-height: 12vh;
  flex: 2;
  display: flex;
  overflow-y:auto;
  justify-content: space-between;
`;

export const Division = styled.div`
  max-height: 30vh;
  flex: 2;
  display: flex;
  justify-content: space-between;
  overflow-y:auto;
  margin-top:2%;
  margin-bottom:2%;
  margin-left:3%;
  margin-right:auto;
`;

export const Status = styled.h1`
  text-align: left;
  font-size: 26px;
  margin-bottom: 5%;
  margin-top: 5%;
`;

export const OrderList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 5px;
  padding-left: 15px;
  margin-bottom: 10px;
`;
export const OrderItem = styled.li`
  font-size: 20px;
  display: inline-block;
  margin-top:5px;
  margin-bottom:5px;
`;

export const OrderPrice = styled.li`
  font-size: 18px;
  display: inline-block;
`;

export const BreakLine = styled.hr`
  min-width: 100%;
  border: 1px solid #b9b9b9;
`;

export const DivisionBottom = styled.div`
  max-height: 30%;
  flex: 2;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
`;

export const DivisionBack = styled.div`
  margin-right: auto;
  margin-left: auto;
  
`;



export const Total = styled.h2`
  font-size: 20px;
  text-align: right;
`;

export const H2 = styled.h2`
 
  text-align: left;
`;

export const H3 = styled.h3`
  font-size: 20px;
  text-align: left;
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

export const Time = styled.div`
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

export const MyButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  background-color: #aad9cd;
  color: white;
  padding: 7px 14px;
  transition: background 0.5s ease-in-out;
  width: 37%;
  border-radius: 10px;
  border: none;
  &:hover {
    color: black;
    background: #fff;
    cursor: pointer;
  }
`;
