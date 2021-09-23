import styled from "styled-components";


export const Container = styled.div`
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

export const AuthWrapper = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CustomTitle = styled.a`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 40px;
  }
  font-family: Rose;
  font-size: 70px;
`;

export const AuthBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthBox = styled.div`
  max-width: 350px;
  min-width: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 20px 15px;
  margin: 20px 0 10px;
  background: #f5f5f5;
  border-radius: 20px;
`;

export const BottomWrapper = styled.div`
  max-width: 350px;
  min-width: 250px;
  position: relative;
  width: 100%;
  font-family: IBMPlexSansKR-Medium;
  font-size: 13px;
  text-align: center;
`;

export const Visible = styled.div`
  display: ${(props) => props.auth === "signup" ? "none" : ""}
`;

export const SignUpLink = styled.a`
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export const SocialImage = styled.div`
  margin-top: ${(props) => props.auth === "signup" ? "15px" : "35px"};
  border-top: 1px solid #e1e1e1;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 60px 90px 0;
  &:before {
    bottom: 55px;
    position: absolute;
    content: "소셜 계정으로 로그인";
    margin-bottom: 12px;
  }
`;
