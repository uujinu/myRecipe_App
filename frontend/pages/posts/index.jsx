/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import RatingStar from "@components/common/rating";
import CommonLayout from "@components/layout/common";
import TopBtn from "@components/common/scrollTopBtn";
import SearchBar from "@components/common/searchBar";
import Pagination from "react-js-pagination";
import router from "next/router";
import {
  PostWrapper,
  PostList,
  PostCard,
  PostInfo,
  RcpContent,
  Rating,
} from "@components/common/styles/search";
import ImageAvatar from "@components/common/avatar";

const ListContainer = styled.div`
  max-width: 1980px;
  min-height: 100vh;
  width: 100%;
  background-color: white;
`;

const ListWrapper = styled.div`
  max-width: 75rem;
  margin: 0 auto;
`;

const TitleBack = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    height: 140px;
  }
  width: 100%;
  height: 200px;
  position: relative;
  background-color: #ffece3;
`;

const TitleBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    transform: translate(-18%, -75%);
  }
  display: flex;
  height: 500px;
  overflow: hidden;
  padding-top: 100px;
  background-color: #fad5c4;
  border-radius: 45%;
  width: 150%;
  align-content: space-around;
  justify-content: space-around;
  align-items: flex-end;
  transform: translate(-18%, -65%);
`;

const PageTitle = styled.h1`
  ${(props) => props.theme.breakpoints.down("sm")} {
    bottom: 10px;
    font-size: 25px;
    width: 100%;
    text-align: center;
  }
  position: absolute;
  font-family: Rose;
  font-size: 35px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TDSection = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-bottom: 20px;
    padding: 0;
  }
  margin-top: 40px;
  padding: 40px;
  display: flex;
  justify-content: center;
`;

const TDRecipeWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 10px 0;
  }
  margin: 20px;
  width: 800px;
`;

const TitleSection = styled.section`
  ${(props) => props.theme.breakpoints.down("sm")} {
    line-height: 20px;
    margin-bottom: 20px;
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

const TDRecipeBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
    margin: 10px 0;
  }
  display: flex;
  margin: 20px 0;
  align-items: center;
  justify-content: space-between;
`;

const ImgWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    height: 150px;
  }
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;
`;

const ImgItem = styled.div`
  & > div {
    ${(props) => props.theme.breakpoints.down("sm")} {
      height: 150px;
    }
    height: 300px;
  }

  & > div > img {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transition: 0.4s ease-out;
    transition: 0.4s ease-out;
  }

  & > div > img:hover {
    -webkit-transform: scale(1.08);
    transform: scale(1.08);
  }
  position: relative;
`;

const RecipeTitle = styled.a`
  font-family: GmarketSansMedium;
  font-size: 20px;
  height: fit-content;
  &:hover {
    color: #f44336;
  }
`;

const RecipeDetail = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    height: fit-content;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  font-size: 20px;
  color: black;
  height: 120px;
  width: 100%;
  background-color: #faf8f5;
  border: 1px solid #0000000a;

  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

const RCard = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
    margin: 12px 0 10px 0;
  }
  width: 48%;
`;

const RatingBox = styled.div`
  margin-left: auto;
  align-items: flex-start;
  padding: 0 3px;
`;

const SearchSection = styled.section`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
    height: 150px;
  }
  background-color: #faf8f5;
  width: 800px;
  height: 200px;
  margin: 0 auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #0000000a;
`;

const MenuSection = styled.div`
  margin: 0 auto;
  padding: 40px;
`;

const Paginate = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

function RecipeCard({ recipeInfo, src }) {
  const [info, setInfo] = useState(recipeInfo);

  return (
    <>
      <RCard>
        <ImgWrapper>
          <Link href={`/posts/${info.id}`} passHref>
            <a>
              <ImgItem>
                <Image src={src} alt="img" layout="fill" objectFit="cover" />
              </ImgItem>
            </a>
          </Link>
        </ImgWrapper>
        <RecipeDetail className="info">
          <div>
            <Link href={`/posts/${info.id}`} passHref>
              <RecipeTitle>{info.title}</RecipeTitle>
            </Link>
          </div>
          <RatingBox>
            <RatingStar value={info.score_average} precision={0.1} readOnly />
            <div>({info.score_average ? info.score_average : 0})</div>
          </RatingBox>
        </RecipeDetail>
      </RCard>
    </>
  );
}

function NewPost({ list }) {
  return (
    <PostWrapper>
      <PostList>
        {Object.values(list).map((val) => (
          <PostCard key={val.author ? `${val.id}_${val.title}` : val.RECIPE_ID}>
            <Link
              href={
                val.id
                  ? `/posts/${val.id}`
                  : `/posts/${val.RECIPE_ID}?nm=${encodeURIComponent(
                      val.RECIPE_NM_KO,
                    )}`
              }
              passHref
            >
              <a>
                <div
                  style={{
                    position: "relative",
                    height: "222px",
                  }}
                >
                  <Image
                    src={val.IMG_URL || val.thumbnail || "/myrecipe_logo.png"}
                    alt="img"
                    layout="fill"
                    objectFit="cover"
                  />
                  <p>{val.title || val.RECIPE_NM_KO}</p>
                </div>
              </a>
            </Link>
            <PostInfo>
              <>
                {val.author && (
                  <>
                    <Link href={`/profile/${val.author.pk}`} passHref>
                      <a>
                        <div>
                          <ImageAvatar
                            name={val.author.nickname}
                            image={val.author.profile_image}
                          />
                        </div>
                        <div>{val.author.nickname}</div>
                      </a>
                    </Link>
                    <Rating>
                      <RatingStar value={val.score_average} readOnly />
                      <div
                        style={{
                          fontSize: "10px",
                          lineHeight: "20px",
                        }}
                      >
                        ({val.score_average || 0})
                      </div>
                    </Rating>
                  </>
                )}
                {!val.author && (
                  <RcpContent>
                    <div>
                      <ImageAvatar
                        name={val.RECIPE_NM_KO}
                        image="/myrecipe_logo.png"
                      />
                    </div>
                    <div>MyRecipe</div>
                  </RcpContent>
                )}
              </>
            </PostInfo>
          </PostCard>
        ))}
      </PostList>
    </PostWrapper>
  );
}

export default function RecipeList({ today, list, total }) {
  const [page, setPage] = useState(1);

  const handlePageChange = (p) => {
    setPage(p);
    router.push(`/posts/?p=${p}`);
  };

  return (
    <CommonLayout fix={0}>
      <TitleBack>
        <TitleBox />
        <PageTitle>맛있는 레시피가 한가득!</PageTitle>
      </TitleBack>
      <ListContainer>
        <ListWrapper>
          <TDSection>
            <TDRecipeWrapper>
              <TitleSection>
                <Title>오늘의 레시피</Title>
                <TitleSub>뭐 해먹지? 고민은 이제 그만!</TitleSub>
              </TitleSection>
              <TDRecipeBox>
                <RecipeCard
                  recipeInfo={today[0]}
                  src={
                    today[0].thumbnail ? today[0].thumbnail : "/thumb_basic.jpg"
                  }
                />
                <RecipeCard
                  recipeInfo={today[1]}
                  src={
                    today[1].thumbnail ? today[1].thumbnail : "/thumb_basic.jpg"
                  }
                />
              </TDRecipeBox>
            </TDRecipeWrapper>
          </TDSection>
          <SearchSection>
            <TitleSection style={{ border: "none", marginBottom: 0 }}>
              <Title>레시피 찾기</Title>
              <TitleSub>원하는 레시피를 찾아보세요!</TitleSub>
            </TitleSection>
            <SearchBar margin={1} />
          </SearchSection>
          <TDSection>
            <MenuSection>
              <TitleSection>
                <Title>최신 레시피</Title>
                <TitleSub>새로운 레시피가 궁금해!</TitleSub>
              </TitleSection>
              <NewPost list={list} />
            </MenuSection>
          </TDSection>
        </ListWrapper>
      </ListContainer>
      <Paginate>
        <Pagination
          activePage={page}
          itemsCountPerPage={16}
          totalItemsCount={parseInt(total, 10) + 537}
          pageRangeDisplayed={5}
          prevPageText="‹"
          nextPageText="›"
          onChange={handlePageChange}
        />
      </Paginate>
      <TopBtn />
    </CommonLayout>
  );
}

export async function getServerSideProps(ctx) {
  const { p } = ctx.query;
  const pp = p || 1;

  const today = await axios.get(`http://localhost:8000/posts/today/`);
  const res = await axios.get(`http://localhost:8000/posts/post/?p=${pp}`);

  const totalCnt = res.headers.total;
  const idx = 16;
  if (idx * pp > totalCnt) {
    const diff = idx * pp - totalCnt;

    if (diff >= idx) {
      const api = await axios.get(`${
        process.env.NEXT_PUBLIC_VIEW_TN_RECIPE_INFO
      }
    /${diff - idx + 1}/${diff - idx + 16}`);
      res.data.push(...api.data.Grid_20150827000000000226_1.row);
    } else {
      const api =
        await axios.get(`${process.env.NEXT_PUBLIC_VIEW_TN_RECIPE_INFO}
    /1/${diff}`);
      res.data.push(...api.data.Grid_20150827000000000226_1.row);
    }
  }

  return {
    props: {
      today: today.data,
      list: res.data,
      total: totalCnt,
    },
  };
}
