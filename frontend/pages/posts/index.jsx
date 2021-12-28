/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@slice/user";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import RatingStar from "@components/common/rating";
import CommonLayout from "@components/layout/common";
import TopBtn from "@components/common/scrollTopBtn";
import InfoBox, { SnackBar } from "@components/common/snackbar/index";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";
import TurnedInRoundedIcon from "@material-ui/icons/TurnedInRounded";
import axiosWrapper from "../../src/helpers/axiosWrapper";

const ListContainer = styled.div`
  max-width: 1980px;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
    to bottom,
    #fff 12%,
    rgb(255 236 212 / 27%) 15.74%,
    rgb(250 225 213) 100%
  );
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
  background-color: #d1b7ab;
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
  }
  position: absolute;
  font-family: Rose;
  font-size: 35px;
`;

const TopSection = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 20px 5px;
    padding: 0;
  }
  margin-top: 40px;
  padding: 40px;
`;

const TDRecipeWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 10px 0;
  }
  margin: 20px;
`;

const SCTitle = styled.h2`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 20px;
    margin: 25px 0 5px 0;
  }
  font-size: 30px;
  font-family: GmarketSansMedium;
  border-bottom: 5px solid #887a73;
  margin-bottom: 40px;
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
  border-radius: 15px;

  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.24, 1.03, 1, 1);

  & > div.info {
    transition-property: opacity;
    -webkit-transition: 0.4s ease-out;
    transition: 0.4s ease-out;
    opacity: 0;
  }

  &:hover {
    box-shadow: 5px 4px 6px 0 rgb(0 0 0 / 28%);

    & > div.info {
      opacity: 1;
    }
  }
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

const RecipeMark = styled.div`
  cursor: pointer;
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
  background-color: white;
  border-radius: 15px;

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
  align-items: end;
`;

function RecipeCard({ recipeInfo, pk, marks, src }) {
  const [mark, setMark] = useState(false);
  const [msg, setMsg] = useState("");
  const [info, setInfo] = useState(recipeInfo);

  const { open, handleOpen, handleClose } = SnackBar();

  useEffect(() => {
    if (pk) {
      // 해당 포스트의 북마크 여부 확인
      const res = marks.find((m) => m === info.id);
      if (res) setMark(true);
      else setMark(false);
    }
  }, [marks]);

  const handleMark = (e) => {
    if (pk) {
      const method = mark ? "delete" : "post";
      setMsg(mark ? "북마크가 취소되었습니다." : "북마크되었습니다.");
      setMark(!mark);

      axiosWrapper(
        method,
        `/accounts/bookmark/${info.id}/`,
        undefined,
        (res) => {
          handleOpen();
        },
        () => {
          alert("오류가 발생했습니다.");
        },
      );
    } else {
      alert("로그인이 필요합니다.");
    }
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

export default function RecipeList({ list }) {
  const { user } = useSelector(selectUser);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    // 로그인한 유저에 대해서만 북마크 목록 불러옴
    if (user.pk) {
      axiosWrapper(
        "get",
        "http://localhost:8000/accounts/bookmark/",
        undefined,
        (res) => {
          setMarks(res.data.bookmarks);
        },
        (err) => {
          console.log("err: ", err);
        },
      );
    }

export default function RecipeList({ today, list, total }) {

  useEffect(() => {
    // 전체 글 목록
    console.log("clientside: ", list);
  }, []);

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
        </ListWrapper>
      </ListContainer>
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
