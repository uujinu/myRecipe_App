/* eslint-disable array-callback-return */
/* eslint-disable radix */
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  Select,
  FormControl,
  IconButton,
  InputLabel as MuiInputLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import CommonLayout from "../layout/common";
import FileUploadComps from "./fileUploadComp";
import ButtonWrapper from "../common/button";
import axiosWrapper from "../../src/helpers/axiosWrapper";

const PostContainer = styled.form`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
    margin-top: 56px;
  }
  max-width: 1980px;
  width: 100%;
  margin-top: 100px;
  padding: 0 20px;
`;

const RegiTitle = styled.div`
  font-size: 18px;
  padding: 14px 18px;
  line-height: normal;
  border: 1px solid #e9e9e9;
  background-color: #f6f2f0;
  position: relative;

  &:after {
    content: "* 는 필수 항목입니다.";
    position: absolute;
    font-size: 11px;
    bottom: 5px;
    right: 12px;
    color: #fb8752;
  }
`;

const ContentBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 12px;
  }
  padding: 30px;
  background-color: #fcfcfc;
  border: 1px solid #e9e9e9;
  border-top: none;
  border-bottom: 10px solid #f6f2f0;
`;

const ContLine = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px 0 0 0;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 0 auto 5px 0;
  }
  width: 130px;
  font-size: 18px;
  line-height: normal;

  &:after {
    content: "*";
    display: ${(props) => (props.fill ? "" : "none")};
    position: absolute;
    font-size: 14px;
    color: #fb8752;
  }
`;

const SelectInput = styled(Select)`
  .MuiOutlinedInput-input {
    padding: 12px 32px 12px 12px;
  }
`;

const Input = styled.input`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  font-size: 16px;
  width: 600px;
  padding: 6px 12px 6px 15px;
  height: ${(props) => props.height}px;
  border-radius: 6px;
  border: 1px solid #e9e9e9;

  &:focus {
    outline: none;
  }
`;

const TextInput = styled.textarea`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  font: initial;
  width: 600px;
  resize: none;
  font-size: 16px;
  padding: 6px 12px 6px 15px;
  height: ${(props) => props.height}px;
  border-radius: 6px;
  border: 1px solid #e9e9e9;

  &:focus {
    outline: none;
  }
`;

const RecipeInfo = styled.div`
  display: flex;
`;

const IngListDiv = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const IngredientList = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;

  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 10px 0 0 0;
  }

  & > li > input {
    ${(props) => props.theme.breakpoints.down("sm")} {
      width: 100%;
      margin: 0 10px 5px 0;
    }
    width: 300px;
    margin: 0 20px 7px 0;
  }
`;

const ListWrapper = styled.li`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: flex;
    align-items: center;
  }
`;

const DeleteBtnWrapper = styled.img`
  vertical-align: middle;
  cursor: pointer;
  margin: 0 5px;
`;

const AddBtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StepWrapper = styled.div`
  width: 100%;
`;

const CookStepBox = styled.div`
  display: flex;
  padding: 5px 0;
  color: #fb8752;
  font-weight: bold;
`;

const StepInfo = styled.span`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin: 10px 0 20px 0;
    font-size: 13px;
  }
  width: 100%;
  display: flex;
  padding: 20px 10px;
  margin: 20px 0 45px 0;
  line-height: 24px;
  color: #ad978d;
  background-color: #f6f2f0;
  border-radius: 6px;
`;

const CookStepItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CookStepComb = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
  display: flex;
  margin-bottom: 10px;
`;

const CookStepNum = styled.p`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-bottom: 10px;
  }
  width: 130px;
  font-size: 20px;
  margin: 0;
  padding: 6px 0 0 0;
`;

const CookStepList = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
`;

const CookStepLiWrapper = styled.li`
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
  display: flex;
  align-items: center;
`;

const CookStepText = styled.textarea`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  font: initial;
  width: 500px;
  resize: none;
  font-size: 16px;
  padding: 6px 12px 6px 15px;
  height: ${(props) => props.height}px;
  border-radius: 6px;
  border: 1px solid #e9e9e9;

  &:focus {
    outline: none;
  }
`;

const BoxWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: row;
    width: 100%;
  }
  display: flex;
  align-items: center;
`;

const ImagesContainer = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const BtnContainer = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
    padding: 0;
  }
  padding-left: 150px;
  width: 790px;
`;

const BtnBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 20px 15px;
  }
  display: flex;
  justify-content: flex-end;
  padding: 50px 30px;
  background-color: #fcfcfc;
  border: 1px solid #e9e9e9;
  border-top: none;
  margin-bottom: 50px;

  & > div {
    ${(props) => props.theme.breakpoints.down("sm")} {
      width: 100%;
    }
    width: 300px;
    display: flex;

    & > button {
      ${(props) => props.theme.breakpoints.down("sm")} {
        margin: 0 10px;
      }
      width: 100%;
      margin-left: 10px;
    }
  }
`;

function InfoForm({ id, label, name, value, select, func }) {
  return (
    <FormControl
      required
      variant="outlined"
      style={{ margin: "10px 25px 0 0" }}
    >
      <MuiInputLabel id={id}>{label}</MuiInputLabel>
      <SelectInput
        labelId={id}
        native
        name={name}
        value={value}
        onChange={func}
        label={label}
      >
        {select.map((s) => {
          return (
            <option key={s[0]} value={s[0]}>
              {s[1]}
            </option>
          );
        })}
      </SelectInput>
    </FormControl>
  );
}

function ListForm(state, setState, initialState, parent, prefix) {
  const DelBtn = (e) => {
    const { id } = e.target;
    delete state[id];
    setState({ ...state });
    console.log("remove: ", state);
  };

  const AddBtn = () => {
    if (parent) {
      let nextId;
      if (parent.hasChildNodes()) {
        nextId = parseInt(parent.lastChild.id.split("-")[1]) + 1;
      } else nextId = 1;

      state[prefix + nextId] = initialState[`${prefix}1`];
      setState({ ...state });
      console.log("add: ", state);
    }
  };

  const handleItem = (e) => {
    const { name, value } = e.target;
    const id = name.split("_")[0];
    const idx = name.split("_")[1];
    state[id][idx] = value;
    setState({ ...state });
  };

  const addFiles = (e) => {
    const { name } = e.target;
    const { files: newFiles } = e.target;

    if (name === "images") {
      if (newFiles.length) {
        for (const file of newFiles) {
          if (Object.keys(state.images.images).length >= 5) {
            alert("최대 5장까지 업로드할 수 있습니다.");
            break;
          }
          state.images.images[file.name] = file;
        }
        setState({ ...state });
      }
    } else {
      const id = name.split("_")[0];
      const idx = name.split("_")[1];
      if (newFiles.length) {
        for (const file of newFiles) {
          state[id][idx] = file;
        }
        setState({ ...state });
      }
    }
    console.log("state: ", state);
  };

  const removeFiles = (name, fileName) => {
    if (name === "images") {
      delete state.images.images[fileName];
      // 삭제할 이미지가 썸네일로 선택된 경우 썸네일 초기화
      if (state.images.thumbnail === fileName) state.images.thumbnail = "";
      setState({ ...state });
    } else {
      const id = name.split("_")[0];
      const idx = name.split("_")[1];
      delete state[id][idx];
      setState({ ...state });
    }
    console.log("state: ", state);
  };

  const handleThumbNail = (e) => {
    if (state.images.thumbnail === e.target.id) state.images.thumbnail = "";
    else state.images.thumbnail = e.target.id;
    setState({ ...state });
  };

  return {
    DelBtn,
    AddBtn,
    handleItem,
    addFiles,
    removeFiles,
    handleThumbNail,
  };
}

function IngList({ ingState, handleMainChange }) {
  const initialState = {
    "li-1": {
      name: "",
      quantity: "",
    },
    "li-2": {
      name: "",
      quantity: "",
    },
    "li-3": {
      name: "",
      quantity: "",
    },
  };

  const [ing, setIng] = useState(ingState || initialState);
  const parent = document.getElementById("ul-1");
  const { DelBtn, AddBtn, handleItem } = ListForm(
    ing,
    setIng,
    initialState,
    parent,
    "li-",
  );

  useEffect(() => {
    handleMainChange("ingredient", ing);
  }, [ing]);

  return (
    <>
      <IngListDiv>
        <div>
          <IngredientList id="ul-1">
            {Object.keys(ing).map((keys) => (
              <ListWrapper key={keys} id={keys}>
                <Input
                  id={keys}
                  height="35"
                  maxLength="50"
                  name={`${keys}_name`}
                  value={ing[keys].name}
                  placeholder="재료"
                  onChange={handleItem}
                />
                <Input
                  id={keys}
                  height="35"
                  maxLength="50"
                  name={`${keys}_quantity`}
                  value={ing[keys].quantity}
                  placeholder="용량"
                  onChange={handleItem}
                />
                <DeleteBtnWrapper
                  id={keys}
                  src="/btn_del.gif"
                  onClick={DelBtn}
                />
              </ListWrapper>
            ))}
          </IngredientList>
        </div>
        <AddBtnWrapper onClick={AddBtn}>
          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </AddBtnWrapper>
      </IngListDiv>
    </>
  );
}

function StepList({ stepState, handleMainChange }) {
  const initialState = {
    "sli-1": {
      description: "",
      stepImage: "",
    },
    "sli-2": {
      description: "",
      stepImage: "",
    },
  };

  const [step, setStep] = useState(stepState || initialState);
  const parent = document.getElementById("step-list");
  const { addFiles, removeFiles, DelBtn, AddBtn, handleItem } = ListForm(
    step,
    setStep,
    initialState,
    parent,
    "sli-",
  );
  useEffect(() => {
    handleMainChange("cookStep", step);
  }, [step]);

  return (
    <>
      <div>
        <CookStepList id="step-list">
          {Object.keys(step).map((keys, idx) => (
            <CookStepComb key={keys} id={keys}>
              <CookStepNum>Step{idx + 1}</CookStepNum>
              <CookStepLiWrapper key={keys} id={keys}>
                <CookStepText
                  id={keys}
                  name={`${keys}_description`}
                  value={step[keys].description}
                  height="160"
                  placeholder={`Step ${idx + 1} 과정 설명`}
                  onChange={handleItem}
                />
                <BoxWrapper>
                  <FileUploadComps
                    text={0}
                    wide={1}
                    removeFunc={removeFiles}
                    id={keys}
                    name={`${keys}_stepImage`}
                    value={step[keys].stepImage}
                    multiple={false}
                    handle={addFiles}
                  />
                  <DeleteBtnWrapper
                    id={keys}
                    src="/btn_del.gif"
                    onClick={DelBtn}
                  />
                </BoxWrapper>
              </CookStepLiWrapper>
            </CookStepComb>
          ))}
        </CookStepList>
        <BtnContainer>
          <AddBtnWrapper onClick={AddBtn}>
            <IconButton size="small">
              <AddIcon />
            </IconButton>
          </AddBtnWrapper>
        </BtnContainer>
      </div>
    </>
  );
}

function Images({ state, setState }) {
  const { addFiles, removeFiles, handleThumbNail } = ListForm(state, setState);

  return (
    <FileUploadComps
      text={1}
      wide={1}
      removeFunc={removeFiles}
      id="images"
      name="images"
      value={state.images}
      multiple
      handle={addFiles}
      width="600"
      height="80"
      thumbnail={handleThumbNail}
    />
  );
}

export default function Recipe({
  ingState,
  stepState,
  inputState,
  method,
  postId,
}) {
  const [btn, setBtn] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const formData = new FormData();

  const initialState = {
    title: "",
    cookPortion: "",
    cookTime: "",
    cookDegree: "",
    description: "",
    ingredient: {},
    cookStep: {},
    images: {
      thumbnail: "",
      images: {},
    },
    content: "",
  };

  const [input, setInput] = useState(inputState || initialState);

  const COOK_PORTION_SELECT = [
    ["", ""],
    ["_1p", "1인분"],
    ["_2p", "2인분"],
    ["_3p", "3인분"],
    ["_4p", "4인분"],
    ["_5p", "5인분"],
    ["_6p", "6인분 이상"],
  ];
  const COOK_TIME_SELECT = [
    ["", ""],
    ["_10m", "10분 이내"],
    ["_15m", "15분 이내"],
    ["_20m", "20분 이내"],
    ["_30m", "30분 이내"],
    ["_60m", "60분 이내"],
    ["_90m", "90분 이내"],
    ["_2h", "2시간 이내"],
    ["_2hp", "2시간 이상"],
  ];
  const COOK_DEGREE_SELECT = [
    ["", ""],
    ["_d1", "아무나"],
    ["_d2", "초급"],
    ["_d3", "중급"],
    ["_d4", "고급"],
  ];

  const handleBtn = () => {
    const val =
      input.title &&
      input.description &&
      input.cookPortion &&
      input.cookTime &&
      input.cookDegree;
    let ing = false;
    let step = false;

    // 재료 입력 확인
    if (Object.keys(input.ingredient).length) {
      Object.keys(input.ingredient).map((keys) => {
        if (input.ingredient[keys].name && input.ingredient[keys].quantity)
          ing = true;
      });
    }

    // 과정 입력 확인
    if (Object.keys(input.cookStep).length) {
      Object.keys(input.cookStep).map((keys) => {
        if (input.cookStep[keys].description) step = true;
        else {
          // eslint-disable-next-line no-lonely-if
          if (Object.keys(input.cookStep[keys].stepImage).length) step = false;
        }
      });
    }

    // 필수 요소 입력 확인
    if (val && ing && step) setBtn(false);
    else setBtn(true);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setInput({
      ...input,
      [name]: e.target.value,
    });
    handleBtn();
  };

  const handleMainChange = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
    handleBtn();
  };

  const handleCancel = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("변경사항이 저장되지 않을 수 있습니다.")) router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    formData.append("title", input.title);
    formData.append("cook_portion", input.cookPortion);
    formData.append("cook_time", input.cookTime);
    formData.append("cook_degree", input.cookDegree);
    formData.append("description", input.description);
    formData.append("content", input.content);

    // ingredients
    const ingArr = [];
    Object.values(input.ingredient).map((value) => {
      if (value.name && value.quantity) {
        ingArr.push(value);
      }
    });
    formData.append("ingredients", JSON.stringify(ingArr));

    // cooksteps
    Object.values(input.cookStep).map((value, idx) => {
      if (value.description) {
        formData.append("step_des", value.description);
        if (value.stepImage) formData.append(`img_${idx}`, value.stepImage);
      }
    });

    // images
    Object.values(input.images.images).map((value) => {
      formData.append("images", value);
      if (value.name === input.images.thumbnail) {
        formData.append("thumbnail", value);
      }
    });

    const url = method === "post" ? "/posts/post/" : `/posts/post/${postId}/`;
    axiosWrapper(
      method,
      url,
      formData,
      (res) => {
        if (res.status === 201) {
          router.push("/posts");
        }
      },
      (err) => {
        alert(`오류가 발생했습니다. ${err}`);
        console.log("post create err: ", err);
      },
    );

    setLoading(false);
    return false;
  };

  return (
    <>
      <CommonLayout fix={1}>
        <PostContainer onSubmit={handleSubmit}>
          <RegiTitle>레시피 등록</RegiTitle>
          <ContentBox>
            <ContLine>
              <InputLabel fill={1}>레시피 제목</InputLabel>
              <Input
                required
                name="title"
                value={input.title}
                height="35"
                placeholder="예) 부침개 만들기"
                maxLength="50"
                onChange={handleChange}
              />
            </ContLine>
            <ContLine>
              <InputLabel fill={1}>레시피 소개</InputLabel>
              <TextInput
                required
                name="description"
                value={input.description}
                height="70"
                placeholder="예) 부추와 해산물을 활용한 맛있는 부침개 레시피입니다."
                rows="3"
                maxLength="200"
                onChange={handleChange}
              />
            </ContLine>
            <ContLine>
              <InputLabel fill={1}>레시피 정보</InputLabel>
              <RecipeInfo>
                <InfoForm
                  id="cook-portion"
                  label="인원"
                  name="cookPortion"
                  value={input.cookPortion}
                  select={COOK_PORTION_SELECT}
                  func={handleChange}
                />
                <InfoForm
                  id="cook-time"
                  label="시간"
                  name="cookTime"
                  value={input.cookTime}
                  select={COOK_TIME_SELECT}
                  func={handleChange}
                />
                <InfoForm
                  id="cook-degree"
                  label="난이도"
                  name="cookDegree"
                  value={input.cookDegree}
                  select={COOK_DEGREE_SELECT}
                  func={handleChange}
                />
              </RecipeInfo>
            </ContLine>
          </ContentBox>
          <ContentBox>
            <ContLine style={{ marginBottom: "55px" }}>
              <InputLabel
                fill={1}
                style={{ marginBottom: "auto", marginTop: "6px" }}
              >
                재료
              </InputLabel>
              <IngList
                ingState={ingState}
                handleMainChange={handleMainChange}
              />
            </ContLine>
          </ContentBox>
          <ContentBox>
            <ContLine>
              <StepWrapper>
                <InputLabel fill={1}>레시피 순서</InputLabel>
                <StepInfo>
                  <CreateIcon
                    color="action"
                    fontSize="small"
                    style={{ marginRight: "9px" }}
                  />
                  당신의 레시피를 소개해주세요!
                  <br />
                  조리 사진을 첨부하여 더욱 근사한 레시피를 완성해보세요.
                </StepInfo>
                <CookStepBox>
                  <CookStepItem>
                    <StepList
                      stepState={stepState}
                      handleMainChange={handleMainChange}
                    />
                  </CookStepItem>
                </CookStepBox>
              </StepWrapper>
            </ContLine>
          </ContentBox>
          <ContentBox>
            <ContLine>
              <InputLabel style={{ marginBottom: "auto" }}>
                완성 사진
              </InputLabel>
              <ImagesContainer>
                <Images state={input} setState={setInput} />
              </ImagesContainer>
            </ContLine>
          </ContentBox>
          <ContentBox>
            <ContLine>
              <InputLabel>레시피 팁</InputLabel>
              <TextInput
                name="content"
                value={input.content}
                height="100"
                placeholder="예) 반죽에 튀김가루를 섞으면 더욱 바삭해져요."
                rows="3"
                maxLength="200"
                onChange={handleChange}
              />
            </ContLine>
          </ContentBox>
          <BtnBox>
            <div>
              <ButtonWrapper
                disable={btn}
                type="submit"
                loading={isLoading ? "indeterminate" : null}
                size="large"
                text="저장"
              />
              <ButtonWrapper
                handleOnClick={handleCancel}
                type="button"
                size="large"
                text="취소"
              />
            </div>
          </BtnBox>
        </PostContainer>
      </CommonLayout>
    </>
  );
}
