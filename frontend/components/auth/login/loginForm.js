import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../redux/modules/user";
import Form, { useForm } from "../../common/form";
import TextFieldWrapper from "../../common/textfield";
import ButtonWrapper from "../../common/button";
import { loginUser } from "../../../redux/modules/thunk/auth";
import { unwrapResult } from "@reduxjs/toolkit";


export default function LoginForm() {
  const [btn, setBtn] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const initialFValues = {
    email: "",
    password: ""
  }

  // 이메일, 비밀번호 validation
  const validate = (input = values) => {
    let temp = { ...errors }
    if ("email" in input)
    temp.email = (/$^|.+@.+..+/).test(input.email) ? "" : "잘못된 이메일 형식입니다."
    if ("password" in input) {
      if (input.password.length < 8) temp.password = "비밀번호는 최소 8자입니다."
      else if (input.password.length > 15) temp.password = "비밀번호는 8~15자로 구성되어야 합니다."
      else {
        temp.password = (/^(?=.*[a-zA-Z])((?=.*\d)+(?=.*\W)).{8,15}$/).test(input.password) ? "" : "영문자, 숫자, 특수문자를 혼용해야 합니다."
      }
    }
    setErrors({...temp});

    if (temp.email === "" && temp.password === "")
      setBtn(false);
    else setBtn(true);
  }
  
  const handleOnSubmit = e => {
    e.preventDefault();

    dispatch(loginUser(values))
      .then(unwrapResult)
      .then((res) => {
        dispatch(getUserInfo(res));
        router.replace("/");
      })
      .catch((e) => {
        alert("로그인에 실패하였습니다.");
      })
    resetForm();
  }

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate, loginUser);

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <TextFieldWrapper {...(errors.email && {error: true, helperText: errors.email})} required color="secondary" name="email" value={values.email} id="email" label="이메일" onChange={handleInputChange}/>
        <TextFieldWrapper {...(errors.password && {error: true, helperText: errors.password})} required color="secondary" name="password" value={values.password} id="password" label="비밀번호" type="password" inputProps={{maxLength: 16}} onChange={handleInputChange}/>
        <ButtonWrapper type="submit" disable={btn} text={"로그인"} style={{"marginTop": "5px"}}/>
      </Form>
    </>
  )
}
