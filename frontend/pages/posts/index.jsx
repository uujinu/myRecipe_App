// 전체레시피나옴
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import axiosWrapper from "../../src/helpers/axiosWrapper";
import CommonLayout from "@components/layout/common";
import ImageAvatar from "@components/common/avatar";
import TopBtn from "@components/common/scrollTopBtn"
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import TurnedInRoundedIcon from '@material-ui/icons/TurnedInRounded';
import { selectUser } from "../../redux/modules/user";


const ListContainer = styled.div`
  max-width: 1980px;
  min-height: 100vh;
  width: 100%;
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
  margin: 0 5px;

  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.24, 1.03, 1, 1);

  & > div.info {
    transition-property: opacity;
    -webkit-transition: .4s ease-out;
    transition: .4s ease-out;
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
    -webkit-transition: .4s ease-out;
    transition: .4s ease-out;
  }

  & > div > img:hover {
    -webkit-transform: scale(1.08);
    transform: scale(1.08);
  }
  position: relative;
`;

const RecipeDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  font-size: 20px;
  position: absolute;
  bottom: 0;
  color: black;
  height: 120px;
  width: 100%;
  background: #ffe9e98c;
`;

const RecipeMark = styled.div`
  cursor: pointer;
`;


export default function RecipeList({ list }) {

  const { user } = useSelector(selectUser);
  const [marks, setMarks] = useState();

  useEffect(() => {
    // 로그인한 유저에 대해서만 북마크 목록 불러옴
    if (user.pk) {
      axios.get(`http://localhost:8000/posts/bookmarks/${user.pk}/`)
      .then((res) => {
        console.log("res: ", res.data.posts);
        setMarks(res.data.posts);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
    }
  });

  useEffect(() => {
    console.log("clientside: ", list);
  }, []);

  const handleMark = (e) => {

  }

  return (
    <CommonLayout fix={0}>
      <TitleBack>
        <TitleBox>
          <PageTitle>
            맛있는 레시피가 한가득!
          </PageTitle>
        </TitleBox>
      </TitleBack>
      <ListContainer>
        <ListWrapper>
          <TopSection>
            <TDRecipeWrapper>
              <SCTitle>오늘의 레시피</SCTitle>
                <TDRecipeBox>
                  <ImgWrapper>
                    <Link href="/posts" passHref>
                      <a>
                        <ImgItem>
                          <Image src="/platter.jpg" alt="img" layout="fill" objectFit="cover"/>
                        </ImgItem>
                      </a>
                    </Link>
                    <RecipeDetails className="info">바베큐 플래터</RecipeDetails>
                  </ImgWrapper>
                  <ImgWrapper>
                  <Link href="/posts" passHref>
                    <a>
                      <ImgItem>
                        <Image src="/kimchi-rice.jpg" alt="img" layout="fill" objectFit="cover"/>
                      </ImgItem>
                    </a>
                    </Link>
                    <RecipeDetails className="info">
                      김치 볶음밥
                      <RecipeMark onClick={handleMark}>
                        <TurnedInNotOutlinedIcon />
                      </RecipeMark>
                    </RecipeDetails>
                  </ImgWrapper>
                </TDRecipeBox>
            </TDRecipeWrapper>
          </TopSection>
        </ListWrapper>
      </ListContainer>
      <TopBtn />
    </CommonLayout>
  )
};

export async function getServerSideProps(ctx) {
  
  const res = await axios.get("http://localhost:8000/posts/post/");
  return {
    props: {
      list: res.data
    },
  } 
}
