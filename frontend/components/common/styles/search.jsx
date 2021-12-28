import styled from "styled-components";

export const Container = styled.div`
  max-width: 1980px;
  min-height: 100vh;
  padding-top: 100px;
  width: 100%;
  background-color: #fff;
`;

export const Search = styled.div`
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

export const ContentBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 10px 0;
    width: 100%;
    margin: 0;
  }
  max-width: 80em;
  margin: 0 auto;
  height: 100%;
`;

export const InfoBox = styled.div`
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

export const SearchResInfo = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 30px 10px 20px 10px;
  }
  text-align: initial;
`;

export const PostWrapper = styled.div`
  height: 100%;
`;

export const PostList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const PostCard = styled.li`
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

export const PostInfo = styled.div`
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

export const Paginate = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

export const Rating = styled.div`
  display: flex;
  padding: 0 5px;
  & > span {
    font-size: 15px;
  }
`;

export const RcpContent = styled.div`
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
