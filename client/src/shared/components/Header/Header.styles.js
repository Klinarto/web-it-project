import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const HeaderWrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
`;

export const LogoText = styled.h1`
  color: white;
`;

export const ItemList = styled.ul`
  color: white;
  margin: 0 32px 0 0;
  padding: 0;
  display: flex;
  list-style: none;

  & > li:after {
    content: "|";
    margin: 0 16px;
  }
  & > li:last-child:after {
    content: "";
    margin: 0 8px;
  }
  & > a {
    color: white;
  }
`;
export const MyNavLink = styled(NavLink)`
  color: white;

  &:hover {
    color: grey;
  }
`;

export const MyButton = styled(Button)`
  background-color: #aaa;
  color: #000;
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;
