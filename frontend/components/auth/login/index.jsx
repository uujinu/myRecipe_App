import { useTheme } from "@material-ui/styles";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./loginForm";


const Container = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  width: 600px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomTitle = styled.a`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 40px;
  }
  font-family: Rose;
  font-size: 70px;
`;

const LoginBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  max-width: 350px;
  min-width: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 0 15px;
`;

const SignUpWrapper = styled.div`
  max-width: 350px;
  min-width: 250px;
  position: relative;
  width: 100%;
  font-family: IBMPlexSansKR-Medium;
  font-size: 13px;
  text-align: center;
`;

const SignUpLink = styled.a`
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialImage = styled.div`
  margin-top: 35px;
  border-top: 1px solid #e1e1e1;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 60px 90px 0;
  &:before {
    bottom: 55px;
    position: absolute;
    content: "다른 계정으로 로그인";
    margin-bottom: 12px;
  }
`;

export default function Login() {
  const theme = useTheme();

  return (
    <Container theme={theme}>
      <LoginWrapper>
        <Link href="/" passHref>
          <CustomTitle>MyRecipe</CustomTitle>
        </Link>

        <LoginBoxWrapper>
          <LoginBox>
            <LoginForm />
          </LoginBox>
        </LoginBoxWrapper>
        <SignUpWrapper>
          아직 회원이 아니신가요?{" "}
          <Link href="/accounts/signup" passHref>
            <SignUpLink>회원가입</SignUpLink>
          </Link>
          <SocialImage>
            <Link href="/accounts/kakao" passHref>
              <a href="replace">
                <Image
                  src="/login_sns_kakao.png"
                  width={50}
                  height={50}
                  quality={100}
                />
              </a>
            </Link>
            <Link href="/accounts/naver" passHref>
              <a href="replace">
                <Image
                  src="/login_sns_naver.png"
                  width={50}
                  height={50}
                  quality={100}
                />
              </a>
            </Link>
          </SocialImage>
        </SignUpWrapper>
      </LoginWrapper>
    </Container>
  );
}
