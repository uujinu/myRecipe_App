import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";

const NavBar = styled(AppBar)`
  align-items: center;
  position: fixed;
  -webkit-transition-property: background-color, box-shadow, transform;
  -webkit-transition-timing-function: cubic-bezier(0.24, 1.03, 1, 1);
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 15%);
  background-color: #fad5c4ab;

  ${(props) =>
    props.scroll > 200 &&
    props.hide === 1 &&
    css`
      background-color: transparent;
      transform: translateY(-100%);
      box-shadow: none;
    `}

  ${(props) =>
    props.scroll <= 200 &&
    css`
      background-color: transparent;
      box-shadow: none;
    `}
`;

const ToolBar = styled(Toolbar)`
  max-width: 1980px;
  width: 100%;
`;

const Title = styled(Typography)`
  font-family: Rose;
  font-size: 25px;
`;

const AuthElement = styled.div`
  margin-left: auto;
  font-size: 17px;
  border-radius: 20px;
  padding: 5px 3px;
  &:hover {
    background-color: white;
  }
`;

const throttle = (cb, time) => {
  let timerId = null;
  return (e) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      cb.call(this, e);
      timerId = null;
    }, time);
  };
};

const ScrollTracker = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { pageYOffset } = window;
      setScrollY(pageYOffset);
    };
    const throttleScroll = throttle(onScroll, 50);
    window.addEventListener("scroll", throttleScroll, true);
    onScroll();
    return () => {
      window.removeEventListener("scroll", throttleScroll);
    };
  }, []);

  useEffect(() => {
    const deltaY = scrollY - pageY;
    if (deltaY === 0) return;
    if (scrollY === 0 || deltaY < 0) {
      setHide(false);
    } else setHide(true);
    setPageY(scrollY);
  });

  return { scrollY, hide };
};

export default function Header() {
  const { scrollY, hide } = ScrollTracker();

  return (
    <NavBar scroll={scrollY} hide={hide ? 1 : 0}>
      <ToolBar>
        <IconButton edge="start">
          <MenuIcon />
        </IconButton>
        <Title>MyRecipe</Title>
        <AuthElement>
          <Link href="/accounts/login" passHref>
            <a href="replace">JOIN</a>
          </Link>
        </AuthElement>
      </ToolBar>
    </NavBar>
  );
}
