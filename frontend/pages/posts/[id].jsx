/* eslint-disable no-restricted-globals */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "@slice/user";
import Image from "next/image";
import Link from "next/link";
import CommonLayout from "@components/layout/common";
import ImageAvatar from "@components/common/avatar";
import SliderComp from "@components/common/slider";
import InfoBox, { SnackBar } from "@components/common/snackbar";
import RatingStar from "@components/common/rating";
import TopBtn from "@components/common/scrollTopBtn";
import * as S from "@components/common/styles/postDetailStyle";
import PeopleIcon from "@material-ui/icons/People";
import TimerIcon from "@material-ui/icons/Timer";
import { IconButton } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import axiosWrapper from "../../src/helpers/axiosWrapper";

function CommentWrapper({ comments, postId, userId, score }) {
  const [comment, setComment] = useState([...comments]);
  const [cmtInput, setCmtInput] = useState({
    content: "",
    rating: null,
  });
  const [edit, setEdit] = useState({
    idx: null,
    value: "",
    rating: null,
    manage: false,
  });

  const handleEdit = (idx, value, rating) => {
    setEdit({ idx, value, rating, manage: true });
  };

  const handleEditChange = (e) => {
    setEdit({ ...edit, value: e.target.value });
  };

  const handleEditClick = (commentId) => {
    if (edit.value === "") alert("내용을 입력하세요.");
    else {
      axiosWrapper(
        "patch",
        `/posts/comment/${commentId}/`,
        { content: edit.value, rating: edit.rating },
        () => {
          comment[edit.idx].content = edit.value;
          comment[edit.idx].rating = edit.rating;
          setComment([...comment]);
          setEdit({ idx: null, value: "", rating: null, manage: false });
        },
        () => {
          alert("댓글 수정중 오류가 발생했습니다.");
        },
      );
    }
  };

  const handleRemove = (commentId, idx) => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      axiosWrapper(
        "delete",
        `/posts/comment/${commentId}/`,
        undefined,
        () => {
          const newCmt = [
            ...comment.slice(0, idx),
            ...comment.slice(idx + 1, comment.length),
          ];
          setComment([...newCmt]);
        },
        () => {
          alert("댓글 삭제중 오류가 발생했습니다.");
        },
      );
    }
  };

  const handleChange = (e) => {
    cmtInput.content = e.target.value;
    setCmtInput({
      ...cmtInput,
    });
  };

  const handleComment = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
    } else if (cmtInput.content === "" && cmtInput.rating === null)
      alert("내용을 입력하세요");
    else {
      axiosWrapper(
        "post",
        `/posts/${postId}/comment/`,
        { ...cmtInput, author: userId },
        (res) => {
          setCmtInput({ content: "", rating: null });
          const { data } = res;
          setComment([data, ...comment]);
        },
        () => {
          alert("오류가 발생했습니다.");
        },
      );
    }
  };

  return (
    <S.ContLine>
      <S.StarDiv>
        <span>
          <RatingStar value={score} precision={0.1} readOnly />
          <span style={{ fontSize: "15px", color: "#999" }}>{score}/5</span>
        </span>
      </S.StarDiv>
      <S.ContTitle>
        댓글 ({comment.length || 0}) <span>Comments</span>
      </S.ContTitle>
      {comment.length ? (
        Object.values(comment).map((val, idx) => (
          <div key={`${val.id}_${val.created_at}`}>
            <S.CommentBox>
              <S.CmtImg>
                <Link href={`/profile/${val.author.pk}`} passHref>
                  <a>
                    <ImageAvatar
                      name={val.author.nickname}
                      image={val.author.profile_image || "/myrecipe_logo.png"}
                    />
                  </a>
                </Link>
              </S.CmtImg>
              <S.CommentBody>
                <div>
                  <h4>
                    <b>{val.author.nickname}</b>
                    {val.created_at}
                  </h4>
                  {val.rating !== null && (
                    <span>
                      <RatingStar value={val.rating} precision={0.1} readOnly />
                    </span>
                  )}
                </div>
                {edit.manage && idx === edit.idx ? (
                  <S.EditBox>
                    <S.TextInput
                      value={edit.value}
                      onChange={handleEditChange}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "7px",
                        right: "68px",
                      }}
                    >
                      <span>
                        <RatingStar
                          value={edit.rating}
                          precision={0.5}
                          onChange={(e, newValue) => {
                            edit.rating = newValue;
                            setEdit({ ...edit });
                          }}
                        />
                      </span>
                    </div>
                    <S.CommentBtn
                      onClick={() => {
                        handleEditClick(val.id);
                      }}
                    >
                      등록
                    </S.CommentBtn>
                  </S.EditBox>
                ) : (
                  <p>{val.content}</p>
                )}
              </S.CommentBody>
              {val.author.pk === userId && idx !== edit.idx && (
                <S.CtrlBox>
                  <S.CtrlBtn
                    onClick={() => {
                      handleEdit(idx, val.content, val.rating);
                    }}
                  >
                    수정
                  </S.CtrlBtn>
                  <span style={{ color: "#ddd", padding: "0 3px" }}>|</span>
                  <S.CtrlBtn
                    onClick={() => {
                      handleRemove(val.id, idx);
                    }}
                  >
                    삭제
                  </S.CtrlBtn>
                </S.CtrlBox>
              )}
            </S.CommentBox>
          </div>
        ))
      ) : (
        <div>댓글을 남겨보세요!</div>
      )}
      <S.CommentWriteBox>
        <div style={{ position: "relative", width: "100%" }}>
          <S.TextInput value={cmtInput.content} onChange={handleChange} />
          <div style={{ position: "absolute", bottom: "5px", right: "5px" }}>
            <span>
              <RatingStar
                value={cmtInput.rating}
                precision={0.5}
                onChange={(e, newValue) => {
                  cmtInput.rating = newValue;
                  setCmtInput({ ...cmtInput });
                }}
              />
            </span>
          </div>
        </div>
        <S.CommentBtn onClick={handleComment}>등록</S.CommentBtn>
      </S.CommentWriteBox>
    </S.ContLine>
  );
}

export default function RecipeDetail({ recipe }) {
  const { user } = useSelector(selectUser);
  const [state, setState] = useState({
    follow: false,
    like: false,
    bookmark: false,
  });
  const [mark, setMark] = useState({
    like: recipe[0].total_likes || 0,
    bookmark: recipe[0].total_bookmarks || 0,
  });
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { id, nm } = router.query;
  const { open, handleOpen, handleClose } = SnackBar();

  useEffect(() => {
    if (user.pk && !nm) {
      axiosWrapper(
        "get",
        `/accounts/info/?user=${recipe[0].author.pk}&post=${id}`,
        undefined,
        (res) => {
          setState({ ...res.data.response });
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
        `/accounts/following/${recipe[0].author.pk}/`,
        undefined,
        () => {
          state.follow = !state.follow;
          setMsg(
            state.follow ? "팔로우되었습니다." : "팔로우가 취소되었습니다.",
          );
          setState({ ...state });
          handleOpen();
        },
        () => {
          alert("오류가 발생했습니다.");
        },
      );
    }
  };

  const handleLike = () => {
    if (!user.pk) alert("로그인이 필요합니다.");
    else {
      axiosWrapper(
        "post",
        `/posts/like/${id}/`,
        undefined,
        (res) => {
          state.like = !state.like;
          mark.like = res.data.count;
          setMsg(res.data.msg);
          setState({ ...state });
          setMark({ ...mark });
          handleOpen();
        },
        () => {
          alert("오류가 발생했습니다.");
        },
      );
    }
  };

  const handleMark = () => {
    if (!user.pk) alert("로그인이 필요합니다.");
    else {
      axiosWrapper(
        "post",
        `/posts/bookmark/${id}/`,
        undefined,
        (res) => {
          state.bookmark = !state.bookmark;
          mark.bookmark = res.data.count;
          setMsg(res.data.msg);
          setState({ ...state });
          setMark({ ...mark });
          handleOpen();
        },
        () => {
          alert("오류가 발생했습니다.");
        },
      );
    }
  };

  return (
    <CommonLayout fix={0}>
      <S.Container>
        <S.Contents>
          <S.TopSection>
            <div style={{ position: "relative", padding: "20px 0 100px 0" }}>
              <S.ThumbNailBox>
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
              </S.ThumbNailBox>
              <S.UserInfo>
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
                    <span>{recipe[0].author.nickname} </span>
                    {recipe[0].author.pk !== user.pk && (
                      <IconButton
                        size="small"
                        color="secondary"
                        style={{
                          borderRadius: "5px",
                          marginLeft: "3px",
                          position: "absolute",
                          bottom: "-3px",
                        }}
                        onClick={handleFollowing}
                      >
                        {state.follow ? <PersonIcon /> : <PersonAddIcon />}
                      </IconButton>
                    )}
                  </>
                )}
                {!recipe[0].author && (
                  <S.RcpInfo>
                    <div>
                      <ImageAvatar name="MyRecipe" image="/myrecipe_logo.png" />
                    </div>
                    <span>MyRecipe</span>
                  </S.RcpInfo>
                )}
              </S.UserInfo>
            </div>
            <S.Summary>
              <>
                <h3>{recipe[0].title || recipe[0].RECIPE_NM_KO}</h3>
                <p>{recipe[0].description || recipe[0].SUMRY}</p>
                <S.CookInfoBox>
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
                </S.CookInfoBox>
              </>
            </S.Summary>
          </S.TopSection>
          <S.ContLine>
            <S.ContTitle>
              재료 <span>Ingredients</span>
            </S.ContTitle>
            <S.IngBox>
              <S.Ings>
                {recipe[0].author &&
                  Object.values(recipe[0].ingredients).map((val) => (
                    <div key={`${val.name}_${val.quantity}`}>
                      <li>
                        {val.name}
                        <span>{val.quantity}</span>
                      </li>
                    </div>
                  ))}
                {recipe[0].INGREDIENT &&
                  Object.values(recipe[0].INGREDIENT).map((val) => (
                    <div key={`${val.IRDNT_NM}_${val.IRDNT_CPCTY}`}>
                      <li>
                        {val.IRDNT_NM}
                        <span>{val.IRDNT_CPCTY}</span>
                      </li>
                    </div>
                  ))}
              </S.Ings>
            </S.IngBox>
          </S.ContLine>
          <S.ContLine style={{ paddingBottom: 0 }}>
            <S.ContTitle>
              조리순서 <span>Steps</span>
            </S.ContTitle>
            <S.Steps>
              {recipe[0].author &&
                Object.values(recipe[0].cooksteps).map((val) => (
                  <S.StepDiv key={`${val.step_id}_${recipe[0].title}`}>
                    <S.StepDDiv>
                      <S.StepNum>{val.step_id}</S.StepNum>
                      <S.StepDes>{val.description}</S.StepDes>
                    </S.StepDDiv>
                    {val.step_image && (
                      <S.StepImg>
                        <Image
                          src={val.step_image}
                          alt="img"
                          layout="fill"
                          objectFit="cover"
                        />
                      </S.StepImg>
                    )}
                  </S.StepDiv>
                ))}
              {!recipe[0].author &&
                Object.values(recipe[1]).map((val, idx) => (
                  <S.StepDiv key={`${val.COOKING_NO}_${val.ROW_NUM}`}>
                    <S.StepDDiv>
                      <S.StepNum>{idx + 1}</S.StepNum>
                      <S.StepDes>
                        {val.COOKING_DC}
                        {val.STEP_TIP && (
                          <span style={{ fontSize: "13px" }}>
                            <br />
                            {val.STEP_TIP}
                          </span>
                        )}
                      </S.StepDes>
                    </S.StepDDiv>
                    {val.STRE_STEP_IMAGE_URL && (
                      <S.StepImg>
                        <Image
                          src={val.STRE_STEP_IMAGE_URL}
                          alt="img"
                          layout="fill"
                          objectFit="cover"
                        />
                      </S.StepImg>
                    )}
                  </S.StepDiv>
                ))}
            </S.Steps>
          </S.ContLine>
          {recipe[0].author && (
            <>
              <S.ContLine style={{ border: "none" }}>
                <S.CookImgs>
                  <SliderComp>
                    {Object.values(recipe[0].images).map((val) => (
                      <S.ImgItem key={val}>
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
                      </S.ImgItem>
                    ))}
                  </SliderComp>
                </S.CookImgs>
              </S.ContLine>
              <S.ContLine style={{ border: "none" }}>
                <S.LikeMarkBox>
                  <div>
                    <IconButton
                      style={{ padding: "10px", color: "#f44336" }}
                      onClick={handleLike}
                    >
                      {state.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <p>{mark.like}</p>
                  </div>
                  <div>
                    <IconButton
                      style={{ padding: "10px", color: "#4e342e" }}
                      onClick={handleMark}
                    >
                      {state.bookmark ? <TurnedInIcon /> : <TurnedInNotIcon />}
                    </IconButton>
                    <p>{mark.bookmark}</p>
                  </div>
                </S.LikeMarkBox>
              </S.ContLine>
              {recipe[0].content && (
                <S.ContLine>
                  <S.ContTitle>
                    팁 <span>Tips</span>
                  </S.ContTitle>
                  <S.TipDiv>{recipe[0].content}</S.TipDiv>
                </S.ContLine>
              )}
              <CommentWrapper
                comments={recipe[0].comments}
                postId={id}
                userId={user.pk}
                score={recipe[0].score_average}
              />
            </>
          )}
        </S.Contents>
        <InfoBox open={open} onClose={handleClose} message={msg} id={msg} />
      </S.Container>
      <TopBtn />
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
    // 정렬
    const sorted = res[2].data.Grid_20150827000000000228_1.row.sort(
      function comp(a, b) {
        return a.COOKING_NO - b.COOKING_NO;
      },
    );

    temp.push(res[0].data.Grid_20150827000000000226_1.row[0]);
    temp.push(sorted);
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
