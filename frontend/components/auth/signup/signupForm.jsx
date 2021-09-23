import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form, { useForm } from "@components/common/form";
import TextFieldWrapper from "@components/common/textfield";
import ButtonWrapper from "@components/common/button";
import { Input } from "@material-ui/core";
import { PhotoCameraRounded } from "@material-ui/icons"
import { IconButton } from "@material-ui/core";
import { signupUser } from "@slice/thunk/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectSignup } from "@slice/signup";


const ImageWrapper = styled.div`
  font-family: IBMPlexSansKR-Medium;
`;

const Upload = styled(Input)`
  display: none;
`;

export default function SignUpForm() {
  const [btn, setBtn] = useState(true);
  const [pw, setPW] = useState(true);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectSignup);
  const formData = new FormData();

  const initialFValues = {
    email: "",
    username: "",
    password1: "",
    password2: "",
    profile_image: ""
  }
  
  const handleOnSubmit = e => {
    e.preventDefault();

    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("password1", values.password1);
    formData.append("password2", values.password2);

    dispatch(signupUser(formData))
      .then(unwrapResult)
      .then((res) => {
        alert(values.email + " 로 전송된 인증 이메일을 확인하여 가입을 완료하세요.")
      })
      .catch((e) => {
        const res = e;
        let temp = { ...errors };
        if (e.hasOwnProperty('email')) 
          temp.email = res.email;
        if (e.hasOwnProperty('username')) 
          temp.username = "중복된 닉네임입니다.";       
        setErrors({...temp});
        alert("가입에 실패하였습니다.");
      })
    resetForm();
  }

  // 이메일, 비밀번호 validation
  const validate = (input = values) => {
    let temp = { ...errors }
    if ("email" in input)
      temp.email = (/$^|.+@.+..+/).test(input.email) ? "" : "잘못된 이메일 형식입니다."
    if ("password1" in input) {
      if (input.password1.length < 8) temp.password1 = "비밀번호는 최소 8자입니다."
      else if (input.password1.length > 15) temp.password1 = "비밀번호는 8~15자로 구성되어야 합니다."
      else {
        temp.password1 = (/^(?=.*[a-zA-Z])((?=.*\d)+(?=.*\W)).{8,15}$/).test(input.password1) ? "" : "영문자, 숫자, 특수문자를 혼용해야 합니다."
      }
    }
    if ("password2" in input) {
      temp.password2 = (values.password1 !== input.password2) ? "비밀번호를 동일하게 입력해주세요." : ""
    }
    if ("username" in input) {
      temp.username = ""
    }

    setErrors({...temp});

    if (temp.password1 === "")
      setPW(false);
    else setPW(true);

    if (temp.email === "" && temp.password2 === "")
      setBtn(false);
    else setBtn(true);
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      formData.append("profile_image", uploadFile);
    }
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <TextFieldWrapper {...(errors.email && {error: true, helperText: errors.email})} required color="secondary" name="email" value={values.email} id="email" label="이메일" onChange={handleInputChange}/>
        <TextFieldWrapper {...(errors.username && {error: true, helperText: errors.username})} required color="secondary" name="username" value={values.username} id="username" label="닉네임" inputProps={{maxLength: 20}} onChange={handleInputChange}/>
        <TextFieldWrapper {...(errors.password1 && {error: true, helperText: errors.password1})} required color="secondary" name="password1" value={values.password1} id="password1" label="비밀번호1" type="password" inputProps={{maxLength: 16}} onChange={handleInputChange}/>
        <TextFieldWrapper {...(errors.password2 && {error: true, helperText: errors.password2})} placeholder="비밀번호 재입력" disabled={pw} required color="secondary" name="password2" value={values.password2} id="password2" label="비밀번호2" type="password" inputProps={{maxLength: 16}} onChange={handleInputChange}/>
        
        <ImageWrapper>
        <label htmlFor="icon-button-file">
          프로필 이미지
        <Upload accept="image/*" name="profile_image" id="icon-button-file" type="file" onChange={handleOnChange}/>
        <IconButton size="small" aria-label="upload picture" component="span">
          <PhotoCameraRounded />
        </IconButton>
        </label>
        </ImageWrapper>
        <ButtonWrapper type="submit" disable={btn} text={"회원가입"} style={{"marginTop": "5px"}} loading={isLoading? "indeterminate" : null}/>
      </Form>
    </>
  )
}
