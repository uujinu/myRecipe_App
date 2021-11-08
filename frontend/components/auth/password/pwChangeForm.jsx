/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import router from "next/router";
import axios from "axios";
import TextFieldWrapper from "@components/common/textfield";
import Form, { useForm } from "@components/common/form";
import ButtonWrapper from "@components/common/button";
import { useState } from "react";
import * as S from "../styles/style";

export default function PWChangeForm() {
  const [btn, setBtn] = useState(true);
  const [loading, setLoading] = useState(false);

  function getQuery() {
    const url = document.location.href;
    const qs = url.substring(url.indexOf("?") + 1).split("&");
    for (var i = 0, result = {}; i < qs.length; i++) {
      qs[i] = qs[i].split("=");
      result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    // eslint-disable-next-line block-scoped-var
    return result;
  }
  const result = getQuery();
  const key = Object.values(result);
  const initial = {
    new_password1: "",
    new_password2: "",
    uid: key[0],
    token: key[1],
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const res = axios.post(
      `http://localhost:8000/accounts/password/reset/confirm/${result.uidb64}/${result.token}/`,
      values,
    );
    res
      .then((r) => {
        if (r.status === 200) {
          alert(r.data.detail);
          router.push("/accounts/login");
        }
      })
      .catch(() => {
        alert("비밀번호 변경에 실패하였습니다.");
      });
    setLoading(false);
    resetForm();
  };

  const validate = (input = values) => {
    const temp = { ...errors };
    if ("new_password1" in input) {
      if (input.new_password1.length < 8)
        temp.new_password1 = "비밀번호는 최소 8자입니다.";
      else if (input.new_password1.length > 15)
        temp.new_password1 = "비밀번호는 8~15자로 구성되어야 합니다.";
      else {
        temp.new_password1 = /^(?=.*[a-zA-Z])((?=.*\d)+(?=.*\W)).{8,15}$/.test(
          input.new_password1,
        )
          ? ""
          : "영문자, 숫자, 특수문자를 혼용해야 합니다.";
      }
    }
    if ("new_password2" in input) {
      temp.new_password2 =
        values.new_password1 !== input.new_password2
          ? "비밀번호를 동일하게 입력해주세요."
          : "";
    }

    setErrors({ ...temp });
    if (temp.new_password1 === "" && temp.new_password2 === "") {
      setBtn(false);
    } else setBtn(true);
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initial,
    true,
    validate,
  );

  return (
    <S.Container>
      <S.AuthWrapper>
        <S.AuthBoxWrapper>
          <S.AuthBox>
            <Form onSubmit={handleOnSubmit}>
              <TextFieldWrapper
                {...(errors.new_password1 && {
                  error: true,
                  helperText: errors.new_password1,
                })}
                required
                color="secondary"
                name="new_password1"
                value={values.new_password1}
                id="password1"
                label="비밀번호1"
                type="password"
                inputProps={{ maxLength: 16 }}
                onChange={handleInputChange}
              />
              <TextFieldWrapper
                {...(errors.new_password2 && {
                  error: true,
                  helperText: errors.new_password2,
                })}
                placeholder="비밀번호 재입력"
                required
                color="secondary"
                name="new_password2"
                value={values.new_password2}
                id="password2"
                label="비밀번호2"
                type="password"
                inputProps={{ maxLength: 16 }}
                onChange={handleInputChange}
              />
              <ButtonWrapper
                type="submit"
                disable={btn}
                text="비밀번호 변경"
                style={{ marginTop: "5px" }}
                loading={loading ? "indeterminate" : null}
              />
            </Form>
          </S.AuthBox>
        </S.AuthBoxWrapper>
      </S.AuthWrapper>
    </S.Container>
  );
}
