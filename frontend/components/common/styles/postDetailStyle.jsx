import styled from "styled-components";

export const Container = styled.div`
  max-width: 1980px;
  min-height: 100vh;
  width: 100%;
  margin-top: 100px;
`;

export const Contents = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
  }
  padding: 0 50px;
`;

export const TopSection = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 600px;
`;

export const ThumbNailBox = styled.div`
  position: relative;
  height: 400px;
`;

export const UserInfo = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 35px;
  & > div {
    display: flex;
    justify-content: center;
  }
  & > div > a > div {
    width: 90px;
    height: 90px;
  }
  & > span {
    font-size: 11px;
  }
`;

export const RcpInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div > div {
    width: 90px;
    height: 90px;
  }
  & > span {
    font-size: 11px;
  }
`;

export const Summary = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 20px 10px;
  }
  padding-top: 50px;
  font-size: 20px;

  & > p {
    color: #aaa;
    font-size: 15px;
    font-family: Noto Sans CJK KR;
  }
`;

export const CookInfoBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 20px 0 0 0;
  }
  display: flex;
  justify-content: space-around;
  color: #aaa;
  padding: 20px 0 40px 0;
  & > span {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    text-align: center;
    color: #bcb7b7;

    & > .MuiSvgIcon-root {
      width: 40px;
      height: 40px;
    }
  }
`;

export const ContLine = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 50px 10px;
  }
  padding: 50px 75px;
  margin: 20px auto;
  border-top: 2px solid #e9e9e9;
  max-width: 75rem;
`;

export const ContTitle = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 20px 0;
  }
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 40px 0;

  & > span {
    color: #bcb7b7;
    font-size: 11px;
    font-weight: normal;
    font-style: italic;
  }
`;

export const IngBox = styled.div``;

export const Ings = styled.ul`
  ${(props) => props.theme.breakpoints.down("sm")} {
    & > div {
      width: 100% !important;
    }
    & > div > li {
      margin: 0 10px 10px 10px !important;
    }
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    width: 41%;
  }

  & > div > li {
    display: flex;
    justify-content: space-between;
    margin: 0 35px 10px 10px;
    padding: 0 5px;
    border-bottom: 1px solid #e2e2e2;
    line-height: 23px;

    & > span {
      color: #938d8d;
    }
  }
`;

export const Steps = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
  }
  padding: 0 15px;

  & > div {
    min-height: 100px;
    margin-bottom: 50px;
  }
`;

export const StepNum = styled.h2`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 15px;
    width: 25px;
  }
  color: #fafafa;
  width: 33px;
  background-color: #d1b7ab;
  text-align: center;
  padding-top: 5px;
  margin-right: 10px;
  height: fit-content;
`;

export const StepDes = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 15px;
  }
  padding: 0 10px;
  word-break: break-all;
  font-size: 18px;
  width: 100%;
`;

export const StepImg = styled.div`
  position: relative;
  height: 220px;
  width: 100%;

  & > div {
    border-radius: 20px;
    width: 300px;
    margin: 0 0 0 auto !important;
  }
`;

export const StepDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StepDDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const CookImgs = styled.div``;

export const ImgItem = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    height: 300px;
  }
  position: relative;
  height: 450px;
`;

export const TipDiv = styled.div`
  white-space: break-spaces;
  line-height: 25px;
`;

export const LikeMarkBox = styled.div`
  display: flex;
  justify-content: flex-end;

  & > div > p {
    margin: 0;
    font-size: 12px;
    text-align: center;
  }
`;

export const CommentBox = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 18px;
  border-bottom: 1px solid #e6e7e8;
`;

export const CmtImg = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-right: 5px;
  }
  margin-right: 15px;
`;

export const CommentBody = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    & > div > h4 {
      width: 100%;
    }
  }
  width: 100%;
  font-family: Noto Sans CJK KR;

  & > div {
    display: flex;
    align-items: center;

    & > h4 {
      font-size: 12px;
      font-family: Noto Sans CJK KR;
      font-weight: normal;

      & > b {
        margin-right: 5px;
        color: #f4726c;
        font-size: 15px;
      }
    }

    & > span {
      display: flex;
      margin: 0 5px;

      & > span {
        font-size: 18px;
      }
    }
  }

  & > p {
    margin-top: 10px;
  }
`;

export const CtrlBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    bottom: 0;
  }
  position: absolute;
  right: 0;
  margin-right: 5px;
  font-size: 12px;
  font-family: IBMPlexSansKR-Medium;
  color: #aaa;
`;

export const CtrlBtn = styled.span`
  padding: 0;
  cursor: pointer;
`;

export const StarDiv = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0 0 30px 0;
  }
  padding: 40px 0 70px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > span {
    display: flex;
    align-items: end;

    & > span {
      font-size: 30px;
      padding: 0 3px;
    }
  }
`;

export const TextInput = styled.textarea`
  font: initial;
  width: 100%;
  resize: none;
  font-size: 12px;
  padding: 6px 12px 6px 15px;
  height: 60px;
  border-radius: 6px;
  border: 1px solid #e9e9e9;
  position: relative;

  &:focus {
    outline: none;
  }
`;

export const CommentBtn = styled.button`
  width: 60px;
  height: 60px;
  margin-left: 10px;
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  background-color: #fb9c98;
  color: #fafafa;
`;

export const CommentWriteBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
  }
  padding: 0 15px;
  display: flex;
  width: 100%;
`;

export const EditBox = styled.div`
  margin: 10px 0;
`;
