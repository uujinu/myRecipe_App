import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "@slice/login";
import { userLogout } from "@slice/user";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import ImageAvatar from ".";

const AvatarBtn = styled(Button)`
  padding: 0;
  border-radius: 50%;
  &.MuiButton-root {
    min-width: 0;
  }
`;

export default function AvatarElement(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line camelcase
  const { pk, nickname, profile_image } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleOnClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push(`/profile/${pk}`);
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8000/accounts/logout/", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(userLogout(res));
        dispatch(logout(res));
        router.push("/");
      })
      .catch(() => {
        alert("로그아웃에 실패했습니다.");
      });
  };

  return (
    <div>
      <AvatarBtn
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOnClick}
        disableTouchRipple
      >
        {/* eslint-disable-next-line camelcase */}
        <ImageAvatar name={nickname} image={profile_image} />
      </AvatarBtn>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleOnClose}
      >
        <MenuItem onClick={handleProfile}>프로필 보기</MenuItem>
        <MenuItem onClick={handleSettings}>설정</MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
}
