/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { Button } from "@material-ui/core";
import SearchBar from "../common/searchBar";
import axiosWrapper from "../../src/helpers/axiosWrapper";

const MainContainer = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
  }
  width: 100%;
  background-color: #fff;
`;

const Search = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 0;
    height: 120px;
  }
  margin-top: 50px;
  height: 180px;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(181deg, #ffdee1, #fad5c4);
`;

const TitleSection = styled.section`
  ${(props) => props.theme.breakpoints.down("sm")} {
    line-height: 20px;
    margin-bottom: 10px;
  }
  font-family: GmarketSansMedium;
  text-align: center;
  margin-bottom: 40px;
  line-height: 30px;
`;

const Title = styled.h2`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 25px;
    margin-bottom: 7px;
  }
  font-size: 30px;
  letter-spacing: 7px;
  text-shadow: 2px 2px #fad5c4;
`;

const TitleSub = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: #ff9260;
  letter-spacing: initial;
`;

const ContentBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 60px 0 40px 0;
  }
  padding: 100px 0 50px 0;
  max-width: 75rem;
  margin: 0 auto;
`;

const TrandItem = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
  display: flex;
`;

const ItemWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 0 0 10px 0;
  }
  width: 100%;
  margin: 0 5px;

  & > a > div > div > img {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transition: 0.4s ease-out;
    transition: 0.4s ease-out;
  }

  & > a > div > div > div {
    -webkit-transform: background-color;
    transform: background-color;
    -webkit-transition: 0.4s ease-out;
    transition: 0.4s ease-out;
  }

  & > a > div:hover {
    & > div {
      background-color: #fb9c98;
    }

    & > div > img {
      -webkit-transform: scale(1.08);
      transform: scale(1.08);
    }
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  height: 45px;
  padding: 10px;
  position: absolute;
  bottom: 0;
  text-align: center;
  font-size: 17px;
  background-color: #fad5c4;
  color: #ffffff;
  font-family: GmarketSansMedium;
`;

const RecentBox = styled.div`
  display: flex;
`;

const RecentItem = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "600px")};

  &:hover {
    & > a > div > div + div {
      display: block;
    }
  }
`;

const RecentTitle = styled.div`
  padding: 0 5px;
  display: none;
  position: absolute;
  bottom: 0;
  font-size: 21px;
  font-weight: bold;
  color: #ffffff;
  background-color: #fb9c98;
  font-family: GmarketSansMedium;
`;

const SideBox = styled.div`
  width: 100%;
  height: 100%;
`;

const ViewMore = styled.div`
  width: 100%;
  text-align: center;
  padding: 15px;
  text-decoration: underline;
  font-size: 30px;

  & > a {
    font-family: Rose;
  }
`;

const SignUpBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 40px 12px;

    & > a {
      width: 40%;
    }

    & > h3 {
      font-size: 15px;
    }
  }
  background-color: #ffe0e0;
  display: flex;
  justify-content: space-between;
  padding: 40px 80px;
  align-items: center;

  & > h3 {
    font-family: Noto Sans CJK KR;
  }
`;

const SearchRes = styled.div`
  background-color: #ffff;
  height: 38px;
`;

function ItemBox({ recipeInfo }) {
  const [info, setInfo] = useState(recipeInfo);

  return (
    <ItemWrapper>
      <Link href={`/posts/${info.id}`} passHref>
        <a>
          <div style={{ position: "relative", height: "400px" }}>
            <Image
              src={info.thumbnail}
              alt="img"
              layout="fill"
              objectFit="cover"
            />
            <ItemTitle>{info.title}</ItemTitle>
          </div>
        </a>
      </Link>
    </ItemWrapper>
  );
}

function RecentWrapper({ recipeInfo, height }) {
  const [info, setInfo] = useState(recipeInfo);

  return (
    <>
      <RecentItem height={height}>
        <Link href={`/posts/${info.id}`} passHref>
          <a>
            <div style={{ position: "relative", height: height || "600px" }}>
              <Image
                src={info.thumbnail}
                alt="img"
                layout="fill"
                objectFit="cover"
              />
              <RecentTitle>{info.title}</RecentTitle>
            </div>
          </a>
        </Link>
      </RecentItem>
    </>
  );
}

export default function MainComponent({ list, recipe }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <MainContainer>
        <ContentBox>
          <TitleSection>
            <Title>Trending Now</Title>
            <TitleSub>지금 핫한 그 레시피</TitleSub>
          </TitleSection>
          <TrandItem>
            <ItemBox recipeInfo={list[3]} />
            <ItemBox recipeInfo={list[4]} />
            <ItemBox recipeInfo={list[5]} />
          </TrandItem>
        </ContentBox>
        <Search>
          <SearchBar
            cb={(e) => {
              setSearch(e);
            }}
            data={recipe}
          />
        </Search>
        <ContentBox>
          <TitleSection>
            <Title>Recent Posts</Title>
            <TitleSub>새로운 레시피가 궁금해!</TitleSub>
          </TitleSection>
          <RecentBox>
            <RecentWrapper recipeInfo={list[0]} />
            <SideBox>
              <RecentWrapper height="300px" recipeInfo={list[1]} />
              <RecentWrapper height="300px" recipeInfo={list[2]} />
            </SideBox>
          </RecentBox>
          <ViewMore>
            <Link href="/posts" passHref>
              <a>view more...</a>
            </Link>
          </ViewMore>
        </ContentBox>
        <ContentBox style={{ padding: "0", marginBottom: "50px" }}>
          <SignUpBox>
            <h3>
              더 많은 레시피를 알고싶다면?
              <br />
              MyRecipe와 함께 하세요.
            </h3>
            <Button href="/accounts/signup" variant="outlined">
              Join Us!
            </Button>
          </SignUpBox>
        </ContentBox>
      </MainContainer>
    </>
  );
}
