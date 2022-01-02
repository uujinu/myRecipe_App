/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { selectUser } from "@slice/user";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ImageAvatar from "@components/common/avatar";
import InfoBox, { SnackBar } from "@components/common/snackbar";
import { IconButton, Tabs, Tab, Breadcrumbs } from "@material-ui/core";
import axiosWrapper from "../../src/helpers/axiosWrapper";

const Container = styled.div`
  max-width: 1980px;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
`;

const BackColor = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    height: 200px;
  }
  background: linear-gradient(181deg, #ffdee1, #fad5c4);
  height: 250px;
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 90%;
  }
  background-color: #fafafac2;
  position: absolute;
  height: 200px;
  width: 600px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 9px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 15px 20px 7px rgb(214 167 167 / 12%);

  & > div:first-child {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -40px;
    cursor: pointer;
  }
`;

const Info = styled.div`
  position: relative;
  width: 100%;
  padding: 65px 7px 10px 7px;
  text-align: center;
`;

const UserFollow = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  height: 82px;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > span {
      color: #f4726c;
    }
  }
`;

const DashBoard = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 150px 0;
  }
  padding: 150px 30px;
  max-width: 75em;
  margin: 0 auto;
`;

const InfoNum = styled.p`
  margin: 0 !important;
  color: #f4726c;
  font-size: 18px;
  font-weight: bold;
`;

const TabStyle = styled(Tab)`
  &.MuiTab-root {
    line-height: 22px;
  }

  &.MuiTab-textColorInherit {
    opacity: 1;
  }
`;

const TabContainer = styled.div``;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const PanelTitle = styled.h2`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: medium;
    padding-left: 20px;
  }
  font-weight: 100;
  color: #676564;
  margin-right: 5px;
`;

const TabBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: Noto Sans CJK KR;
  font-size: 15px;
  color: ${(props) => (props.sub ? "#f4726c" : "#b7a8b7")};
  &:hover {
    text-decoration: underline;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PostItem = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
    margin: 0 0 70px 0;
  }
  margin: 0 3px 70px;
`;

const PostImg = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  position: relative;
  width: 241px;
  height: 222px;
  & > div {
    border-radius: 10px;
  }

  &:hover {
    color: red;
  }

  & > p {
    position: absolute;
    top: 100%;
  }
`;

const PersonBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding-left: 20px;
  }
  & > a {
    display: flex;
    align-items: center;
    width: fit-content;
  }
`;

const SubBox = styled.div`
  margin-top: 30px;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <TabContainer
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </TabContainer>
  );
}

function PostCard({ value }) {
  return (
    <PostList>
      {Object.values(value).map((val) => (
        <PostItem key={val.id}>
          <Link href={`/posts/${val.id}`} passHref>
            <a>
              <PostImg>
                <Image
                  src={val.thumbnail || "/myrecipe_logo.png"}
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                />
                <p>{val.title}</p>
              </PostImg>
            </a>
          </Link>
        </PostItem>
      ))}
    </PostList>
  );
}

function PersonCard({ value }) {
  return (
    <PersonBox>
      {Object.values(value).map((val) => (
        <Link href={`/profile/${val.pk}`} passHref>
          <a>
            <div
              style={{
                position: "relative",
                width: "auto",
                height: "auto",
                marginRight: "15px",
              }}
            >
              <ImageAvatar name={val.nickname} image={val.profile_image} />
            </div>
            <span>{val.nickname}</span>
          </a>
        </Link>
      ))}
    </PersonBox>
  );
}

export default function ProfilePage({
  post,
  following,
  like,
  bookmark,
  comment,
}) {
  const router = useRouter();
  const [follow, setFollow] = useState(false);
  const [msg, setMsg] = useState("");
  const [value, setValue] = useState(0);
  const [sub, setSub] = useState([true, false]);
  const { user } = useSelector(selectUser);
  const { open, handleOpen, handleClose } = SnackBar();

  const id = parseInt(router.query.id, 10);

  useEffect(() => {
    console.log("list: ", post);
    console.log("following: ", following);
    console.log("like: ", like);
    console.log("bookmark: ", bookmark);
    console.log("comment: ", comment);
  });

  useEffect(() => {
    if (id !== user.pk) {
      axiosWrapper(
        "get",
        `/accounts/info/?user=${id}`,
        undefined,
        (res) => {
          setFollow(res.data.response.follow);
        },
        (err) => {
          console.log("err: ", err);
        },
      );
    }
  }, []);

  const handleFollowing = () => {
    if (!user.pk) alert("로그인이 필요합니다.");
    else {
      axiosWrapper(
        "post",
        `/accounts/following/${id}/`,
        undefined,
        (res) => {
          setMsg(res.data);
          setFollow(!follow);
          handleOpen();
        },
        () => {
          alert("오류가 발생했습니다.");
        },
      );
    }
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const icon = (pl) => {
    return <InfoNum>{pl}</InfoNum>;
  };

  const handleClick = (e) => {
    if (e.target.value === "false") setSub([sub[1], sub[0]]);
  };

  return (
    <Container>
      <>
        <BackColor />
        <AvatarWrapper>
          <Avatar>
            <ImageAvatar name={user.nickname} image={user.profile_image} />
            <Info>
              <div style={{ position: "relative" }}>
                <span>{user.nickname}</span>
                {id !== user.pk && (
                  <IconButton
                    size="small"
                    color="secondary"
                    style={{
                      borderRadius: "5px",
                      marginLeft: "3px",
                      position: "absolute",
                      top: "-6px",
                    }}
                    onClick={handleFollowing}
                  >
                    {follow ? <PersonIcon /> : <PersonAddIcon />}
                  </IconButton>
                )}
              </div>
              <UserFollow>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs"
                >
                  <TabStyle icon={icon(post.length)} label="posts" />
                  <TabStyle
                    icon={icon(following.follower.length)}
                    label="followers"
                  />
                  <TabStyle
                    icon={icon(following.following.length)}
                    label="following"
                  />
                </Tabs>
              </UserFollow>
            </Info>
          </Avatar>
        </AvatarWrapper>
        <DashBoard>
          <TabPanel value={value} index={0}>
            <TitleBox>
              <PanelTitle>POSTS {" >"}</PanelTitle>
              <Breadcrumbs aria-label="breadcrumb">
                <TabBtn
                  type="button"
                  value={sub[0]}
                  sub={sub[0]}
                  onClick={handleClick}
                >
                  작성한 글
                </TabBtn>
                <TabBtn
                  type="button"
                  value={sub[1]}
                  sub={sub[1]}
                  onClick={handleClick}
                >
                  댓글 단 글
                </TabBtn>
              </Breadcrumbs>
            </TitleBox>
            <SubBox>
              {sub[0] && <PostCard value={post} />}
              {sub[1] && <PostCard value={comment} />}
            </SubBox>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PanelTitle>FOLLOWERS {" >"}</PanelTitle>
            <SubBox>
              <PersonCard value={following.follower} />
            </SubBox>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PanelTitle>FOLLOWING {" >"}</PanelTitle>
            <SubBox>
              <PersonCard value={following.following} />
            </SubBox>
          </TabPanel>
        </DashBoard>
        <InfoBox open={open} onClose={handleClose} message={msg} id={msg} />
      </>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const url = "http://localhost:8000";
  const post = await axios.get(`${url}/posts/post/?userId=${id}`);
  const following = await axios.get(`${url}/accounts/following/${id}`);
  const like = await axios.get(`${url}/posts/like/?user=${id}`);
  const bookmark = await axios.get(`${url}/posts/bookmark/?user=${id}`);
  const comment = await axios.get(`${url}/posts/comment/?user=${id}`);
  return {
    props: {
      post: post.data,
      following: following.data,
      like: like.data,
      bookmark: bookmark.data,
      comment: comment.data,
    },
  };
}
