/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import CommonLayout from "@components/layout/common";
import ImageAvatar from "@components/common/avatar";
import SliderComp from "@components/common/slider";
import PeopleIcon from "@material-ui/icons/People";
import TimerIcon from "@material-ui/icons/Timer";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

const Container = styled.div`
  max-width: 1980px;
  min-height: 100vh;
  width: 100%;
  margin-top: 100px;
`;

const Contents = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
  }
  padding: 0 50px;
`;

const TopSection = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 600px;
`;

const ThumbNailBox = styled.div`
  position: relative;
  height: 400px;
`;

const UserInfo = styled.div`
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

const RcpInfo = styled.div`
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

const Summary = styled.div`
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

const CookInfoBox = styled.div`
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

const ContLine = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 50px 10px;
  }
  padding: 50px 75px;
  margin: 20px auto;
  border-top: 2px solid #e9e9e9;
  max-width: 75rem;
`;

const ContTitle = styled.div`
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

const IngBox = styled.div``;

const Ings = styled.ul`
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

const Steps = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
  }
  padding: 0 15px;

  & > div {
    min-height: 100px;
    margin-bottom: 50px;
  }
`;

const StepNum = styled.h2`
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

const StepDes = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 15px;
  }
  padding: 0 10px;
  word-break: break-all;
  font-size: 18px;
  width: 100%;
`;

const StepImg = styled.div`
  position: relative;
  height: 220px;
  width: 100%;

  & > div {
    border-radius: 20px;
    width: 300px;
    margin: 0 0 0 auto !important;
  }
`;

const StepDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepDDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const CookImgs = styled.div``;

const ImgItem = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    height: 300px;
  }
  position: relative;
  height: 450px;
`;

export default function RecipeDetail({ recipe }) {
  return (
    <CommonLayout fix={0}>
      <Container>
        <Contents>
          <TopSection>
            <div style={{ position: "relative", padding: "20px 0 100px 0" }}>
              <ThumbNailBox>
                <Image
                  src={
                    recipe[0].IMG_URL ||
                    recipe[0].thumbnail ||
                    "/myrecipe_logo.png"
                  }
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                />
              </ThumbNailBox>
              <UserInfo>
                {recipe[0].author && (
                  <>
                    <div>
                      <Link href={`/profile/${recipe[0].author.pk}`} passHref>
                        <a>
                          <ImageAvatar
                            name={recipe[0].author.nickname}
                            image={
                              recipe[0].author.profile_image ||
                              "/myrecipe_logo.png"
                            }
                          />
                        </a>
                      </Link>
                    </div>
                    <span>{recipe[0].author.nickname}</span>
                  </>
                )}
                {!recipe[0].author && (
                  <RcpInfo>
                    <div>
                      <ImageAvatar name="MyRecipe" image="/myrecipe_logo.png" />
                    </div>
                    <span>MyRecipe</span>
                  </RcpInfo>
                )}
              </UserInfo>
            </div>
            <Summary>
              <>
                <h3>{recipe[0].title || recipe[0].RECIPE_NM_KO}</h3>
                <p>{recipe[0].description || recipe[0].SUMRY}</p>
                <CookInfoBox>
                  <span>
                    <PeopleIcon />
                    {recipe[0].QNT || recipe[0].cookInfo.cookPortion}
                  </span>
                  <span>
                    <TimerIcon />
                    {recipe[0].COOKING_TIME || recipe[0].cookInfo.cookTime}
                  </span>
                  <span>
                    <RestaurantMenuIcon />
                    {recipe[0].LEVEL_NM || recipe[0].cookInfo.cookDegree}
                  </span>
                </CookInfoBox>
              </>
            </Summary>
          </TopSection>
          <ContLine>
            <ContTitle>
              재료 <span>Ingredients</span>
            </ContTitle>
            <IngBox>
              <Ings>
                {recipe[0].author &&
                  Object.values(recipe[0].ingredients).map((val) => (
                    <div key={val.name}>
                      <li>
                        {val.name}
                        <span>{val.quantity}</span>
                      </li>
                    </div>
                  ))}
                {recipe[0].INGREDIENT &&
                  Object.values(recipe[0].INGREDIENT).map((val) => (
                    <div key={val.IRDNT_NM}>
                      <li>
                        {val.IRDNT_NM}
                        <span>{val.IRDNT_CPCTY}</span>
                      </li>
                    </div>
                  ))}
              </Ings>
            </IngBox>
          </ContLine>
          <ContLine style={{ paddingBottom: 0 }}>
            <ContTitle>
              조리순서 <span>Steps</span>
            </ContTitle>
            <Steps>
              {recipe[0].author &&
                Object.values(recipe[0].cooksteps).map((val) => (
                  <StepDiv key={`${val.step_id}_${recipe[0].title}`}>
                    <StepDDiv>
                      <StepNum>{val.step_id}</StepNum>
                      <StepDes>{val.description}</StepDes>
                    </StepDDiv>
                    {val.step_image && (
                      <StepImg>
                        <Image
                          src={val.step_image}
                          alt="img"
                          layout="fill"
                          objectFit="cover"
                        />
                      </StepImg>
                    )}
                  </StepDiv>
                ))}
              {!recipe[0].author &&
                Object.values(recipe[1]).map((val) => (
                  <StepDiv key={val.COOKING_NO}>
                    <StepDDiv>
                      <StepNum>{val.COOKING_NO}</StepNum>
                      <StepDes>
                        {val.COOKING_DC}
                        {val.STEP_TIP && (
                          <span style={{ fontSize: "13px" }}>
                            <br />
                            {val.STEP_TIP}
                          </span>
                        )}
                      </StepDes>
                    </StepDDiv>
                    {val.STRE_STEP_IMAGE_URL && (
                      <StepImg>
                        <Image
                          src={val.STRE_STEP_IMAGE_URL}
                          alt="img"
                          layout="fill"
                          objectFit="cover"
                        />
                      </StepImg>
                    )}
                  </StepDiv>
                ))}
            </Steps>
          </ContLine>
          {recipe[0].author && (
            <ContLine style={{ border: "none" }}>
              <CookImgs>
                <SliderComp>
                  {Object.values(recipe[0].images).map((val) => (
                    <ImgItem key={val}>
                      <img
                        src={val}
                        display="block"
                        style={{
                          margin: "0 auto",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        alt="img"
                        align="center"
                      />
                    </ImgItem>
                  ))}
                </SliderComp>
              </CookImgs>
            </ContLine>
          )}
        </Contents>
      </Container>
    </CommonLayout>
  );
}

export async function getServerSideProps(ctx) {
  const temp = [];

  if (ctx.query.nm) {
    const res = await Promise.all([
      axios.get(
        `${
          process.env.NEXT_PUBLIC_VIEW_TN_RECIPE_INFO
        }/1/100?RECIPE_NM_KO=${encodeURIComponent(ctx.query.nm)}`,
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_VIEW_TN_RECIPE_IRDNT}/1/100?RECIPE_ID=${ctx.query.id}`,
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_VIEW_TN_RECIPE_CRSE}/1/100?RECIPE_ID=${ctx.query.id}`,
      ),
    ]);
    res[0].data.Grid_20150827000000000226_1.row[0].INGREDIENT =
      res[1].data.Grid_20150827000000000227_1.row;
    temp.push(res[0].data.Grid_20150827000000000226_1.row[0]);
    temp.push(res[2].data.Grid_20150827000000000228_1.row);
  } else {
    const ress = await axios.get(
      `http://localhost:8000/posts/post/${ctx.query.id}`,
    );
    temp.push(ress.data);
  }

  return {
    props: {
      recipe: temp,
    },
  };
}
