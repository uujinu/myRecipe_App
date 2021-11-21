/* eslint-disable camelcase */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { selectUser } from "@slice/user";
import AvatarElement from "../avatar/avatarElement";

const NavBar = styled(AppBar)`
  align-items: center;
  position: fixed;
  -webkit-transition-property: background-color, box-shadow, transform;
  -webkit-transition-timing-function: cubic-bezier(0.24, 1.03, 1, 1);
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 15%);
  background-color: ${(props) => (props.fix ? "#fad5c4" : "#fad5c4ab")};

  ${(props) =>
    props.scroll > 200 &&
    props.hide === 1 &&
    props.fix === 0 &&
    css`
      background-color: transparent;
      transform: translateY(-100%);
      box-shadow: none;
    `}

  ${(props) =>
    props.scroll <= 200 &&
    props.fix === 0 &&
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

const LoginBtn = styled.div`
  margin-left: auto;
  font-size: 17px;
  border-radius: 20px;
  padding: 5px 3px;
  &:hover {
    background-color: white;
  }
`;

const AvatarWrapper = styled.div`
  margin-left: auto;
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
      setScrollY(-1);
    };
  }, []);

  useEffect(() => {
    if (scrollY !== -1) {
    const deltaY = scrollY - pageY;
    if (deltaY === 0) return;
    if (scrollY === 0 || deltaY < 0) {
      setHide(false);
    } else setHide(true);
    setPageY(scrollY);
    }
  }, [scrollY]);

  return { scrollY, hide };
};

const Buttons = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { pk, nickname, profile_image } = props.user;
  const LoginElement = () => {
    return (
      <LoginBtn>
        <Link href="/accounts/login" passHref>
          <a href="replace">JOIN</a>
        </Link>
      </LoginBtn>
    );
  };
  const AvatarMenu = () => {
    return (
      <AvatarWrapper>
        <AvatarElement pk={pk} name={nickname} profile_image={profile_image} />
      </AvatarWrapper>
    );
  };

  if (pk === null) return <LoginElement />;
  return <AvatarMenu />;
};

export default function Header({ fix }) {
  const { scrollY, hide } = ScrollTracker();
  const { user } = useSelector(selectUser);

  return (
    <NavBar scroll={scrollY} hide={hide ? 1 : 0} fix={fix}>
      <ToolBar>
        <IconButton edge="start">
          <MenuIcon />
        </IconButton>
        <Title>MyRecipe</Title>
        <Buttons user={user} />
      </ToolBar>
    </NavBar>
  );
}
