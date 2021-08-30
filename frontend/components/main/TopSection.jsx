import styled from "styled-components";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IconButton } from "@material-ui/core";
import { Fade } from "react-awesome-reveal";

const Container = styled.div`
  background-image: url("/bgImage.jpg");
  max-width: 1980px;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
`;

const BackgroundFilter = styled.div`
  height: 100vh;
  background-color: rgb(247 202 202 / 50%);
  display: flex;
  justify-content: center;
`;

const TyphoWrapper = styled.div`
  min-width: 280px;
  padding: 50px 30px;
  font-family: Rose;
  text-shadow: 4px 2px 6px white;
`;

const MainTypho = styled.div`
  font-size: 25px;
  font-weight: bold;
  ${(props) => props.theme.breakpoints.down("395")} {
    font-size: 18px;
  }
`;

const MainTyphoText = styled.div`
  font-size: 55px;
  line-height: 1;
  font-weight: bold;
  ${(props) => props.theme.breakpoints.down("500")} {
    font-size: 40px;
    line-height: 1;
  }
  ${(props) => props.theme.breakpoints.down("395")} {
    font-size: 35px;
  }
`;

const TransitionWapper = styled.div`
  margin: auto 0;
  text-align: center;
`;

const DownArrow = styled(ExpandMoreIcon)`
  font-size: 30px;
  color: #fff;
  margin-top: 50px;
`;

export default function TopSection() {
  return (
    <Container>
      <BackgroundFilter styles={{ display: "flex", justifyContent: "center" }}>
        <TransitionWapper>
          <TyphoWrapper>
            <Fade direction="down">
              <MainTypho>매일 새롭게 맞이하는 건강한 식단</MainTypho>
              <MainTyphoText>
                나만의 레시피를
                <br />
                만들고 공유해보세요.
              </MainTyphoText>
            </Fade>
          </TyphoWrapper>

          <Fade direction="down">
            <DownArrow>
              <IconButton size="medium">
                <ExpandMoreIcon />
              </IconButton>
            </DownArrow>
          </Fade>
        </TransitionWapper>
      </BackgroundFilter>
    </Container>
  );
}
