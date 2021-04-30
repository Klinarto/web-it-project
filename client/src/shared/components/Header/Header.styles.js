import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
