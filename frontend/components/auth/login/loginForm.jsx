/* eslint-disable no-sequences */
/* eslint-disable no-use-before-define */
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Form, { useForm } from "@components/common/form";
import TextFieldWrapper from "@components/common/textfield";
import ButtonWrapper from "@components/common/button";
import { loginUser } from "@slice/thunk/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { getUserInfo } from "@slice/user";
import { selectLogin } from "@slice/login";
import { IconButton } from "@material-ui/core";

const CloseBtn = styled.div`
  position: absolute;
  right: 0;
  top: -15px;
`;

const ResendForm = styled.div`
  width: 100%;
  position: relative;
  display: ${(props) => (props.resend ? "" : "none")};
`;

const InfoBox = styled.div`
  font-family: auto;
  margin: 10px 2px 2px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const Clickable = styled.div`
  cursor: pointer;
`;

const MessageBox = styled.div`
  font-family: auto;
  margin: 35px 0 20px;
  text-align: center;
`;

function Resend(props) {
  const { choice } = props;
  const initial = {
    email: "",
  };
  const [values, setvalues] = useState(initial);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", values.email);
    if (choice === "verify")
      axios.post("http://localhost:8000/accounts/send-email/", formData);
    else axios.post("http://localhost:8000/accounts/password/reset/", formData);
    setvalues(initial);
    alert("이메일이 전송되었습니다.");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setvalues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <MessageBox>안내문을 수신할 이메일을 입력하세요.</MessageBox>
      <form onSubmit={handleOnSubmit}>
        <TextFieldWrapper
          required
          color="secondary"
          name="email"
          value={values.email}
          id="re-email"
          label="이메일"
          onChange={handleInputChange}
        />
        <ButtonWrapper
          type="submit"
          text="확인"
          style={{ marginTop: "5px", width: "100%" }}
        />
      </form>
    </>
  );
}

export default function LoginForm() {
  const [resend, setResend] = useState(false);
  const [choice, setChoice] = useState("");
  const { isLoading } = useSelector(selectLogin);
  const router = useRouter();
  const dispatch = useDispatch();

  const initialFValues = {
    email: "",
    password: "",
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(values))
      .then(unwrapResult)
      .then((res) => {
        dispatch(getUserInfo(res));
        router.replace("/");
      })
      .catch(() => {
        alert("로그인에 실패하였습니다.");
      });
    resetForm();
  };

  const { values, handleInputChange, resetForm } = useForm(
    initialFValues,
    false,
    undefined,
  );

  return (
    <>
      <ResendForm resend={resend}>
        <Resend choice={choice} />
        <CloseBtn>
          <IconButton
            size="small"
            disableRipple
            onClick={() => (setResend(!resend), setChoice(""))}
          >
            <Close />
          </IconButton>
        </CloseBtn>
      </ResendForm>
      <Form onSubmit={handleOnSubmit}>
        <ResendForm resend={!resend}>
          <TextFieldWrapper
            required
            color="secondary"
            name="email"
            value={values.email}
            id="email"
            label="이메일"
            onChange={handleInputChange}
          />
          <TextFieldWrapper
            required
            color="secondary"
            name="password"
            value={values.password}
            id="password"
            label="비밀번호"
            type="password"
            inputProps={{ maxLength: 16 }}
            onChange={handleInputChange}
          />
          <ButtonWrapper
            type="submit"
            text="로그인"
            style={{ marginTop: "5px", width: "100%" }}
            loading={isLoading ? "indeterminate" : null}
          />
          <InfoBox>
            <Clickable
              onClick={() => (setResend(!resend), setChoice("verify"))}
            >
              인증이메일 재전송
            </Clickable>
            <Clickable
              onClick={() => (setResend(!resend), setChoice("password"))}
            >
              비밀번호 변경
            </Clickable>
          </InfoBox>
        </ResendForm>
      </Form>
    </>
  );
}
