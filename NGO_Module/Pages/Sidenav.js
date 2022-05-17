import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";
import Home from "./home.png";
import PowerOff from "./logout.png";
import assign from "./assign.png";

const Container = styled.div`
  position: fixed;
  .active {
    border-right: 4px solid white;
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;
const Logo = styled.div`
  width: 2rem;
  img {
    width: 100%;
    height: auto;
  }
`;

const Button = styled.button`
  background-color: black;
  border: none;
  opacity: 0.85;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: "";
    background-color: white;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? "1.7" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;
const SidebarContainer = styled.div`
  background-color: black;
  opacity: 0.85;
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const SlickBar = styled.ul`
  color: white
  list-style: none;
  opacity: 0.85;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding: 2rem 0;
  position: absolute;
  top: 6rem;
  left: 0;
  width: ${(props) => (props.clicked ? "13rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;
const Item = styled(NavLink)`
  text-decoration: none;
  color: white;
  width: 100%;
  padding: 1.3rem 0;
  padding-left: 5px;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-right: 4px solid white;
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  img {
    width: 2.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;
const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  font-size: 20px;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <Container>
      <Button clicked={click} onClick={() => handleClick()}>
        click
      </Button>
      <SidebarContainer>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
      </SidebarContainer>
      <SlickBar clicked={click}>
        <Item
          onClick={() => setClick(false)}
          exact
          activeClassName="active"
          to="/home"
        >
          <img src={Home} alt="Home" />
          <Text clicked={click}>Home</Text>
        </Item>
        <Item
          onClick={() => setClick(false)}
          exact
          activeClassName="active"
          to="/assigned"
        >
          <img src={assign} alt="assigned" />
          <Text clicked={click}>Assigned</Text>
        </Item>
        <Item onClick={() => setClick(false)} activeClassName="active" to="/">
          <img src={PowerOff} alt="logout" />
          <Text clicked={click}>logout</Text>
        </Item>
      </SlickBar>
    </Container>
  );
};

export default Sidebar;
