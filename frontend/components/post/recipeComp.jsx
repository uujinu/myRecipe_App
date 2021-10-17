import { useState, useEffect } from "react";
import styled from "styled-components";
import { Select, FormControl, IconButton, InputLabel as MuiInputLabel } from "@material-ui/core";
import CommonLayout from "../layout/common";
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';


const PostContainer = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
    margin-top: 56px;
  }
  width: 100%;
  margin-top: 100px;
  padding: 0 20px;
  min-height: 100vh;
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
    display: ${(props)=> props.fill? "" : "none"};
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
  padding : 6px 0 0 0;
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

const CookStepImg = styled.input`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

const BoxWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: row;
    width: 100%
  }
  display: flex;
  align-items: center;
`;

const UploadImgContainer = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%
  }

  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  border-radius: 6px;
  border: 4px dotted #e9e9e9;
  align-items: center;
  width: 160px;
  height: 160px;
  margin: 0 15px 0 0;
  color: #b7b2af;

  &:hover {
    border: 4px dotted #fad5c4;
  }
`;

const UploadBtn = styled.button`
  z-index: 1;
  background-color: transparent;
  cursor: pointer;
  color: inherit;
  border: none;
  width: 100%;
  height: 100%;
`;

function InfoForm({id, label, name, value, select, func}) {
  return (
    <FormControl required variant="outlined" style={{margin: "10px 25px 0 0"}}>
      <MuiInputLabel id={id}>{label}</MuiInputLabel>
        <SelectInput
          labelId={id}
          native
          name={name}
          value={value}
          onChange={func}
          label={label}
        >
          {select.map((s, idx) => {
            return <option key={idx} value={s}>{s}</option>
          })}
        </SelectInput>
    </FormControl>
  )
}

function ListForm(state, setState, parent, prefix, initialState) {

  const DelBtn = (e) => {
    const _id = e.target.id;
    delete state[_id];
    setState({...state});
    console.log("remove: ", state);
  };

  const AddBtn = () => {
    let nextId;
    if (parent.hasChildNodes()) {
      nextId = parseInt((parent.lastChild.id).split("-")[1]) + 1;
    } else nextId = 1;

    state[prefix + nextId] = initialState[prefix + "1"];
    setState({...state});
    console.log("add: ", state);
  };

  const handleItem = (e) => {
    const { name, value } = e.target;
    const id = name.split("_")[0];
    const idx = name.split("_")[1];
    state[id][idx] = value;
    setState({...state});
  };

  return {
    DelBtn,
    AddBtn,
    handleItem
  };
}

function IngList({handleMainChange}) {
  const initialState = {
    "li-1": {
      name: "",
      quantity: ""
    },
    "li-2": {
      name: "",
      quantity: ""
    },
    "li-3": {
      name: "",
      quantity: ""
    },
  };

  const [ing, setIng] = useState(initialState);
  const parent = document.getElementById("ul-1");
  const {DelBtn, AddBtn, handleItem} = ListForm(ing, setIng, parent, "li-", initialState);

  useEffect(() => {
    handleMainChange("ingredient", ing);
  }, [ing]);

  return (
    <div>
      <div>
        <FormControl required>
          <IngredientList id="ul-1">
            {Object.keys(ing).map((keys) => (
              <ListWrapper key={keys} id={keys}>
                <Input
                  id={keys}
                  height="35"
                  maxLength="50"
                  name={keys + "_name"}
                  value={ing[keys].name}
                  placeholder="재료"
                  onChange={handleItem}
                />
                <Input
                  id={keys}
                  height="35"
                  maxLength="50"
                  name={keys + "_quantity"}
                  value={ing[keys].quantity}
                  placeholder="용량"
                  onChange={handleItem}
                />
                <DeleteBtnWrapper id={keys} src="/btn_del.gif" onClick={DelBtn}/>
              </ListWrapper>
            ))}
          </IngredientList>
        </FormControl>
      </div>
      <AddBtnWrapper onClick={AddBtn} style={{position: "absolute", width: "100%", right: "0px"}}>
        <IconButton size="small">
          <AddIcon />
        </IconButton>
      </AddBtnWrapper>
    </div>
  )
}

function StepList({handleMainChange}) {
  const initialState = {
    "sli-1": {
      description: "",
      stepImage: ""
    },
    "sli-2": {
      description: "",
      stepImage: ""
    },
  };

  const [step, setStep] = useState(initialState);
  const parent = document.getElementById("step-list");
  const {DelBtn, AddBtn, handleItem} = ListForm(step, setStep, parent, "sli-", initialState);
  
  useEffect(() => {
    handleMainChange("cookStep", step);
  }, [step]);

  return (
    <>
      <FormControl required>
        <CookStepList id="step-list">
          {Object.keys(step).map((keys, idx) => (
            <CookStepComb key={keys} id={keys}>
              <CookStepNum>Step{idx+1}</CookStepNum>
              <CookStepLiWrapper key={keys} id={keys}>
                <CookStepText
                  id={keys}
                  name={keys + "_description"}
                  value={step[keys].description}
                  height="160"
                  placeholder={"Step" + (idx+1) + " 과정 설명"}
                  onChange={handleItem}
                />
                <BoxWrapper>
                  <UploadImgContainer>
                    <UploadBtn>
                      <AddPhotoAlternateIcon fontSize="large"/>
                    </UploadBtn>
                    <CookStepImg
                      id={keys}
                      type="file"
                      name={keys + "_stepImage"}
                      value={step[keys].stepImage}
                      onChange={handleItem}
                    />
                  </UploadImgContainer>
                  <DeleteBtnWrapper id={keys} src="/btn_del.gif" onClick={DelBtn}/>
                </BoxWrapper>
              </CookStepLiWrapper>
            </CookStepComb>
          ))}
        </CookStepList>
      </FormControl>
      <AddBtnWrapper onClick={AddBtn}>
        <IconButton size="small">
          <AddIcon />
        </IconButton>
      </AddBtnWrapper>
    </>
  )
}

export default function Recipe() {
  const [input, setInput] = useState({
    title: "",
    cookPortion: "",
    cookTime: "",
    cookDegree: "",
    description: "",
    ingredient: {},
    cookStep: {},
    images: {},
    content: ""
  });

  const COOK_PORTION_SELECT = ["1인분", "2인분", "3인분", "4인분", "5인분", "6인분 이상"];
  const COOK_TIME_SELECT = ["10분 이내", "15분 이내", "20분 이내", "30분 이내", "60분 이내", "90분 이내", "2시간 이내", "2시간 이상"];
  const COOK_DEGREE_SELECT = ["아무나", "초급", "중급", "고급"];

  const handleChange = (e) => {
    const name = e.target.name;
    setInput({
      ...input,
      [name]: e.target.value,
    });
  };

  const handleMainChange = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    })
  };
  
  return (
    <>
      <CommonLayout fix={1}>
        <PostContainer>
          <RegiTitle>레시피 등록</RegiTitle>
            <ContentBox>
              <ContLine>
                <InputLabel fill={1}>레시피 제목</InputLabel>
                <Input
                  name="title"
                  value={input.title}
                  height="35"
                  placeholder="예) 부침개 만들기"
                  maxLength= "50"
                  onChange={handleChange}
                />
              </ContLine>
              <ContLine>
                <InputLabel fill={1}>레시피 소개</InputLabel>
                <TextInput
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
                  <InfoForm id="cook-portion" label="인원" name="cookPortion" value={input.cookPortion} select={COOK_PORTION_SELECT} func={handleChange}/>
                  <InfoForm id="cook-time" label="시간" name="cookTime" value={input.cookTime} select={COOK_TIME_SELECT} func={handleChange}/>
                  <InfoForm id="cook-degree" label="난이도" name="cookDegree" value={input.cookDegree} select={COOK_DEGREE_SELECT} func={handleChange}/>
                </RecipeInfo>
              </ContLine>     
            </ContentBox>
            <ContentBox>
              <ContLine style={{marginBottom: "55px"}}>
              <InputLabel fill={1} style={{marginBottom: "auto", marginTop: "6px"}}>재료</InputLabel>
                <IngList handleMainChange={handleMainChange}/> 
              </ContLine>
            </ContentBox>
            <ContentBox>
              <ContLine>
              <StepWrapper>
                <InputLabel fill={1}>레시피 순서</InputLabel>
                <StepInfo>
                  <CreateIcon color="action" fontSize="small" style={{marginRight: "9px"}} />
                  당신의 레시피를 소개해주세요!<br />
                  조리 사진을 첨부하여 더욱 근사한 레시피를 완성해보세요.
                </StepInfo>
                <CookStepBox>
                  <CookStepItem>
                    <StepList handleMainChange={handleMainChange}/>
                  </CookStepItem>
                </CookStepBox>
              </StepWrapper>
              </ContLine>
            </ContentBox>
          </PostContainer>
      </CommonLayout>
    </>
  )
}
