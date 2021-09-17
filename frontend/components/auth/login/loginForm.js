import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/modules/user";
import Form, { useForm } from "../../common/form";
import TextFieldWrapper from "../../common/textfield";
import ButtonWrapper from "../../common/button";
import { loginUser } from "../../../redux/modules/thunk/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectLogin } from "../../../redux/modules/login";


export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectLogin);

  const initialFValues = {
    email: "",
    password: ""
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
    handleInputChange,
    resetForm
  } = useForm(initialFValues, false, undefined, loginUser);

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <TextFieldWrapper required color="secondary" name="email" value={values.email} id="email" label="이메일" onChange={handleInputChange}/>
        <TextFieldWrapper required color="secondary" name="password" value={values.password} id="password" label="비밀번호" type="password" inputProps={{maxLength: 16}} onChange={handleInputChange}/>
        <ButtonWrapper type="submit" text={"로그인"} style={{"marginTop": "5px"}} loading={isLoading? "indeterminate" : null}/>
      </Form>
    </>
  )
}
