/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import CommonLayout from "@components/layout/common";
import SearchBar from "@components/common/searchBar";
import TopBtn from "@components/common/scrollTopBtn";
import ImageAvatar from "@components/common/avatar";
import RatingStar from "@components/common/rating";
import Pagination from "react-js-pagination";

const Container = styled.div`
  max-width: 1980px;
  min-height: 100vh;
  padding-top: 100px;
  width: 100%;
  background-color: #fff;
`;

const Search = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 0;
    height: 120px;
  }
  height: 180px;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(181deg, #ffdee1, #fad5c4);
`;

const ContentBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 10px 0;
    width: 100%;
    margin: 0;
  }
  width: 75rem;
  margin: 0 auto;
  height: 100%;
`;

const InfoBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
    font-size: 15px;
  }
  padding: 40px 80px;
  text-align: center;
  font-size: 17px;

  & > span {
    color: #f4726c;
  }

  & > p {
    font-size: 15px;
    line-height: 25px;
    margin-top: 50px;
  }
`;

const SearchResInfo = styled.div`
  text-align: initial;
`;

const PostWrapper = styled.div`
  height: 100%;
`;

const PostList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const PostCard = styled.li`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 0 0 50px;
    width: 100%;
  }
  width: 222px;
  margin: 0 3px 50px;

  & > a > div > div {
    border-radius: 10px;
  }

  &:hover {
    & > a > div {
      color: #f4726c;
      font-weight: bold;
    }
  }

  & > a > div > p {
    position: relative;
    top: 230px;
    text-align: initial;
    padding: 0 7px;
  }
`;

const PostInfo = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  position: relative;
  bottom: -30px;
  text-align: initial;
  padding: 0 3px;
  font-size: 12px;

  & > a {
    display: flex;
    align-items: center;
    margin: 2px 0;

    & > div > div {
      width: 30px;
      height: 30px;
    }
  }
`;

const Paginate = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const Rating = styled.div`
  display: flex;
  padding: 0 5px;
  & > span {
    font-size: 15px;
  }
`;

const RcpContent = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0;
  font-family: IBMPlexSansKR-Medium;
  & > div > div {
    width: 30px;
    height: 30px;
    position: relative;
  }
`;

export default function SearchPage({ posts }) {
  const { query } = useRouter();
  const [page, setPage] = useState(1);
  const [recipe, setRecipe] = useState(Object.values(posts).slice(0, 16));

  useEffect(() => {
    setRecipe(Object.values(posts).slice(0, 16));
  }, [query.q]);

  useEffect(() => {
    const idxOfFirst = (page - 1) * 16;
    const idxOfLast = 16 * page;
    setRecipe(Object.values(posts).slice(idxOfFirst, idxOfLast));
  }, [page]);

  const handlePageChange = (p) => {
    setPage(p);
  };

  return (
    <>
      <CommonLayout>
        <Container>
          <Search>
            <SearchBar searchVal={query.q} />
          </Search>
          <ContentBox>
            {Boolean(!posts.length) && (
              <InfoBox>
                <span>
                  <strong>
                    {"'"}
                    {query.q}
                    {"'"}
                  </strong>
                </span>{" "}
                에 대한 검색결과가 없습니다.
                <p>
                  - 단어의 철자가 정확한지 확인해주세요.
                  <br />
                  - 다른 검색어로 검색해 보세요.
                  <br />- 더 일반적인 검색어로 다시 검색해 보세요.
                </p>
              </InfoBox>
            )}
            {Boolean(posts.length) && (
              <InfoBox>
                <SearchResInfo>
                  <strong>{query.q}</strong>에 대한 검색결과입니다.
                </SearchResInfo>
                <PostWrapper>
                  <PostList>
                    {Object.values(recipe).map((val) => (
                      <PostCard key={val.title}>
                        <Link
                          href={
                            val.id
                              ? `/posts/${val.id}`
                              : `/posts/${val.recipeId}?nm=${encodeURIComponent(
                                  val.title,
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
                                src={val.url || val.thumbnail}
                                alt="img"
                                layout="fill"
                                objectFit="cover"
                              />
                              <p>{val.title}</p>
                            </div>
                          </a>
                        </Link>
                        <PostInfo>
                          <>
                            {val.author && (
                              <>
                                <Link
                                  href={`/profile/${val.author.pk}`}
                                  passHref
                                >
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
                                  <RatingStar
                                    value={val.score_average}
                                    readOnly
                                  />
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
                                    name={val.title}
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
              </InfoBox>
            )}
          </ContentBox>
        </Container>
        <TopBtn />
        <Paginate>
          <Pagination
            activePage={page}
            itemsCountPerPage={16}
            totalItemsCount={posts.length}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
          />
        </Paginate>
      </CommonLayout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const res = await axios.get(
    `http://localhost:8000/posts/search?q=${encodeURIComponent(ctx.query.q)}`,
  );
  const ress = JSON.parse(res.data.posts);
  const openapi = JSON.parse(res.data.rcps);

  await Promise.all(
    Object.values(openapi).map(async (val) => {
      const api = await axios.get(`${
        process.env.NEXT_PUBLIC_VIEW_TN_RECIPE_INFO
      }
    /1/100?RECIPE_NM_KO=${encodeURIComponent(val)}`);
      const obj = {
        recipeId: api.data.Grid_20150827000000000226_1.row[0].RECIPE_ID,
        title: val,
        url: api.data.Grid_20150827000000000226_1.row[0].IMG_URL,
      };
      ress.push(obj);
    }),
  );

  return {
    props: {
      posts: ress,
    },
  };
}
