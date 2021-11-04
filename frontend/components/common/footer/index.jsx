import styled from "styled-components";

const FooterWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0 20px;
    height: 100px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 70px 50px 20px 50px;
  height: 180px;
  width: 100%;
  background-color: #fad5c4ab;
  justify-content: space-around;
`;

const TextArea = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 30px 0 5px 0;
  }
  font-size: 10px;
  display: flex;
  max-width: 1980px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 18px;
    margin: 0;
  }
  font-family: Rose;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;


export default function Footer() {
  return (
    <>
      <FooterWrapper>
        <TextArea>
          <Title>MyRecipe</Title>
          Copyright 2021. MyRecipe All rights reserved.
        </TextArea>
      </FooterWrapper>
    </>
  );
}
