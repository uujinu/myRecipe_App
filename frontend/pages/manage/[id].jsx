/* eslint-disable no-restricted-globals */
import axios from "axios";
import styled from "styled-components";
import Image from "next/image";
import router from "next/router";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { IconButton, Button } from "@material-ui/core";
import ImageAvatar from "@components/common/avatar";
import { Resend } from "@components/auth/login/loginForm";
import ButtonWrapper from "@components/common/button";
import { logout } from "@slice/login";
import { userLogout, getUserInfo, selectUser } from "@slice/user";
import nookies, { setCookie } from "nookies";
import axiosWrapper from "../../src/helpers/axiosWrapper";

const Container = styled.div`
  max-width: 1980px;
  width: 100%;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const TitleBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 90%;
  }
  width: 600px;
  font-size: 25px;
  padding: 0 20px;
  margin: 50px auto 10px;
`;

const SubTitleBox = styled.div`
  font-size: 17px;
  margin-bottom: 10px;
  display: flex;
  padding: 20px 0;
`;

const InfoBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 90%;
    height: 100%;
  }
  position: relative;
  width: 600px;
  height: fit-content;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  padding: 20px 10px;
  margin: 0 auto;
`;

const Content = styled.div`
  padding: 10px;
  position: relative;
  border-bottom: ${(props) => (props.bottom ? "none" : "1px solid #e0e0e0")};
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > .MuiAvatar-root {
    width: 90px;
    height: 90px;
  }
`;

const EditImg = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottom}px;
  left: 72px;

  & > .MuiIconButton-root {
    color: #f4726c;
    padding: 0;
  }
`;

const NameBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-left: 15px;
  }
  margin-left: 40px;
  position: relative;

  & > p {
    margin: 0;
    padding-left: 5px;
  }

  &:after {
    position: absolute;
    left: 10px;
    color: red;
    font-weight: 500;
    font-family: Noto Sans CJK KR;
    font-size: 12px;
    content: "${(props) => props.content}";
  }
`;

const InputBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
  display: flex;
`;

const Input = styled.input`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  width: 270px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e9e9e9;

  &:focus {
    outline: none;
  }
`;

const SocialBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px 10px;

  & > span {
    margin-left: 10px;
    font-family: Noto Sans CJK KR;
  }
`;

const SocialNone = styled.div`
  padding: 0 10px 15px;
  font-family: Noto Sans CJK KR;
  color: #d1b7ab;
`;

const UploadFile = styled.input`
  display: none;
`;

const DoubleCheck = styled(Button)`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-top: 2px;
  }
  padding: 0;
  height: 30px;
  width: fit-content;
`;

const ServiceBox = styled.div`
  padding: 30px 10px 10px;

  & > .MuiButton-root {
    background-color: transparent;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BtnBox = styled.div`
  position: absolute;
  bottom: -50px;
  right: 10px;
`;

export default function MyInfo({ social, reauthenticate }) {
  const { user } = useSelector(selectUser);
  const [info, setInfo] = useState({
    nickname: user.nickname,
    profile: "",
  });
  const [dis, setDis] = useState("");
  const [btn, setBtn] = useState(true);
  const [check, setCheck] = useState({
    code: "",
    msg: "",
  });
  const dispatch = useDispatch();

  const handleNaverDelete = () => {
    axiosWrapper(
      "delete",
      `/accounts/users/${user.pk}`,
      undefined,
      (res) => {
        if (res.data.resultcode === "024") {
          alert("[토큰만료] 네이버 재인증 후 탈퇴가 진행됩니다.");
          setCookie(null, "reauthenticate", user.pk, {
            maxAge: 60 * 60,
            path: "/",
          });
          router.push("/accounts/naver/reauthenticate");
        } else {
          Promise.all([dispatch(logout()), dispatch(userLogout())]).then(() => {
            alert("서비스 탈퇴가 완료되었습니다.");
            router.push("/");
          });
        }
      },
      (err) => {
        console.log("err: ", err);
        alert("오류가 발생했습니다.");
      },
    );
  };

  useEffect(() => {
    // 재인증받고 온 경우 바로 탈퇴 진행
    if (reauthenticate === true) {
      handleNaverDelete();
    }
  }, []);

  const handle = (e) => {
    const { name, files } = e.target;
    setInfo({
      ...info,
      [name]: files.item(0),
    });
  };

  const fileInputField = useRef(null);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (check.msg !== "")
      setCheck({
        code: "",
        msg: "",
      });
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleReset = () => {
    info.profile = "";
    setInfo({ ...info });
  };

  const handleNickname = async () => {
    const res = await axios.get(
      `http://localhost:8000/accounts/nickname-check/?name=${encodeURIComponent(
        info.nickname,
      )}`,
    );
    setCheck({ ...res.data });
  };

  const handleDelete = async () => {
    const message =
      "서비스 탈퇴시 작성된 글이 모두 삭제되며 복구할 수 없습니다. 탈퇴하시겠습니까?";
    if (confirm(message)) {
      if (social.platform !== "naver") {
        // 일반 및 카카오 회원 탈퇴
        axiosWrapper(
          "delete",
          `/accounts/users/${user.pk}`,
          undefined,
          () => {
            Promise.all([dispatch(logout()), dispatch(userLogout())]).then(
              () => {
                alert("서비스 탈퇴가 완료되었습니다.");
                router.push("/");
              },
            );
          },
          (err) => {
            console.log("err: ", err);
            alert("오류가 발생했습니다.");
          },
        );
      } else {
        // 네이버 회원 탈퇴
        handleNaverDelete();
      }
    }
  };

  const handleClick = () => {
    setDis(dis === "" ? "none" : "");
  };

  const handleManage = () => {
    const formData = new FormData();
    let result = false;

    if (info.nickname === user.nickname && info.profile === "") {
      result = true;
    } else {
      // 사진이 바뀐 경우
      if (info.profile !== "") {
        result = true;
        formData.append("profile_image", info.profile);
      }

      // 닉네임이 바뀐 경우
      if (info.nickname !== user.nickname) {
        // 중복체크 됐을 경우만 통과
        if (check.code !== "pass") {
          result = false;
          alert("닉네임 중복체크를 해주시기 바랍니다.");
        } else {
          result = true;
          formData.append("nickname", info.nickname);
        }
      }
    }

    if (result) {
      if (info.nickname !== user.nickname || info.profile !== "") {
        axiosWrapper(
          "patch",
          `http://localhost:8000/accounts/users/${user.pk}/`,
          formData,
          (res) => {
            dispatch(getUserInfo(res.data));
            alert("변경이 완료되었습니다.");
            router.push("/");
          },
          (err) => {
            console.log("err: ", err);
            alert("오류가 발생했습니다.");
          },
        );
      } else router.push("/");
    }
  };

  useEffect(() => {
    if (info.nickname === "" || info.nickname === user.nickname) setBtn(true);
    else setBtn(false);
  }, [info.nickname]);

  return (
    <Container>
      <Wrapper>
        <TitleBox>Account Settings</TitleBox>
        <InfoBox>
          <Content>
            <ProfileDiv>
              <UploadFile
                type="file"
                ref={fileInputField}
                title=""
                name="profile"
                accept="image/*"
                onChange={handle}
              />
              <ImageAvatar
                name={user.nickname}
                image={
                  info.profile !== ""
                    ? URL.createObjectURL(info.profile)
                    : user.profile_image
                }
              />
              {info.profile !== "" && (
                <EditImg bottom="80">
                  <IconButton onClick={handleReset}>
                    <CloseIcon />
                  </IconButton>
                </EditImg>
              )}
              <EditImg bottom="22">
                <IconButton onClick={handleUploadBtnClick}>
                  <AddAPhotoIcon />
                </IconButton>
              </EditImg>
              <NameBox content={check.msg}>
                <p>닉네임</p>
                <InputBox>
                  <Input
                    required
                    name="nickname"
                    value={info.nickname}
                    maxLength="20"
                    onChange={handleChange}
                  />
                  <DoubleCheck
                    disableRipple
                    disabled={btn}
                    variant="outlined"
                    onClick={handleNickname}
                  >
                    중복확인
                  </DoubleCheck>
                </InputBox>
              </NameBox>
            </ProfileDiv>
          </Content>
          <Content bottom={social.platform !== ""}>
            <SubTitleBox>연결된 소셜계정</SubTitleBox>
            {social.platform !== "" && (
              <SocialBox>
                <Image
                  src={
                    social.platform === "kakao"
                      ? "/login_sns_kakao.png"
                      : "/login_sns_naver.png"
                  }
                  width={50}
                  height={50}
                  quality={100}
                />
                <span>{user.email}</span>
                <Button
                  style={{
                    position: "absolute",
                    right: "10px",
                    padding: "5px 0",
                  }}
                  variant="outlined"
                  onClick={handleDelete}
                >
                  연결 해제
                </Button>
              </SocialBox>
            )}
            {social.platform === "" && (
              <SocialNone>연결된 계정이 없습니다.</SocialNone>
            )}
          </Content>
          {social.platform === "" && (
            <Content>
              <SubTitleBox>비밀번호 변경</SubTitleBox>
              <Button
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "10px",
                  padding: "5px 0",
                }}
                variant="outlined"
                onClick={handleClick}
              >
                {dis === "" ? "수정" : "취소"}
              </Button>
              {dis === "none" && (
                <div style={{ padding: "0 80px 15px" }}>
                  <Resend />
                </div>
              )}
            </Content>
          )}
          {social.platform === "" && (
            <ServiceBox>
              <Button disableFocusRipple onClick={handleDelete}>
                탈퇴하기
              </Button>
            </ServiceBox>
          )}
          <BtnBox>
            <ButtonWrapper
              type="button"
              text="확인"
              handleOnClick={handleManage}
            />
          </BtnBox>
        </InfoBox>
      </Wrapper>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const { reauthenticate } = nookies.get(ctx);
  const res = await axios.get(
    `http://localhost:8000/accounts/social/?user=${id}`,
  );
  if (reauthenticate !== undefined) {
    nookies.destroy(ctx, "reauthenticate", { path: "/" });
  }

  return {
    props: {
      social: res.data,
      reauthenticate: reauthenticate !== undefined,
    },
  };
}
