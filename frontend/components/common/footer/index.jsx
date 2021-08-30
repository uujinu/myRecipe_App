import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import VerticalAlignTopRoundedIcon from "@material-ui/icons/VerticalAlignTopRounded";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 70px 50px 20px 50px;
  height: 180px;
  width: 100%;
  background-color: #fad5c4ab;
`;

const TextArea = styled.div`
  font-size: 10px;
`;

const Title = styled.div`
  font-family: Rose;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ScrollTopBtn = styled.div`
  height: 51px;
  width: 51px;
`;

export default function Footer() {
  return (
    <>
      <FooterWrapper>
        <TextArea>
          <Title>MyRecipe</Title>
          Copyright 2021. MyRecipe All rights reserved.
        </TextArea>
        <ScrollTopBtn>
          <IconButton>
            <VerticalAlignTopRoundedIcon />
          </IconButton>
        </ScrollTopBtn>
      </FooterWrapper>
    </>
  );
}
