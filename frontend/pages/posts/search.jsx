/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import CommonLayout from "@components/layout/common";
import SearchBar from "@components/common/searchBar";
import TopBtn from "@components/common/scrollTopBtn";
import ImageAvatar from "@components/common/avatar";
import RatingStar from "@components/common/rating";
import * as S from "@components/common/styles/search";
import Pagination from "react-js-pagination";

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
        <S.Container>
          <S.Search>
            <SearchBar searchVal={query.q} />
          </S.Search>
          <S.ContentBox>
            {Boolean(!posts.length) && (
              <S.InfoBox>
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
              </S.InfoBox>
            )}
            {Boolean(posts.length) && (
              <S.InfoBox>
                <S.SearchResInfo>
                  <strong>{query.q}</strong>에 대한 검색결과입니다.
                </S.SearchResInfo>
                <S.PostWrapper>
                  <S.PostList>
                    {Object.values(recipe).map((val) => (
                      <S.PostCard key={`${val.id}_${val.title}`}>
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
                                src={
                                  val.url ||
                                  val.thumbnail ||
                                  "/myrecipe_logo.png"
                                }
                                alt="img"
                                layout="fill"
                                objectFit="cover"
                              />
                              <p>{val.title}</p>
                            </div>
                          </a>
                        </Link>
                        <S.PostInfo>
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
                                <S.Rating>
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
                                </S.Rating>
                              </>
                            )}
                            {!val.author && (
                              <S.RcpContent>
                                <div>
                                  <ImageAvatar
                                    name={val.title}
                                    image="/myrecipe_logo.png"
                                  />
                                </div>
                                <div>MyRecipe</div>
                              </S.RcpContent>
                            )}
                          </>
                        </S.PostInfo>
                      </S.PostCard>
                    ))}
                  </S.PostList>
                </S.PostWrapper>
              </S.InfoBox>
            )}
          </S.ContentBox>
        </S.Container>
        <TopBtn />
        <S.Paginate>
          <Pagination
            activePage={page}
            itemsCountPerPage={16}
            totalItemsCount={posts.length}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
          />
        </S.Paginate>
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
