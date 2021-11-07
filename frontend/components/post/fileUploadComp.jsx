import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const FileUploadContainer = styled.div`
  ${(props) => props.wide && props.theme.breakpoints.down("sm")} {
    width: 100%;
    margin: 10px 0;
  }

  border-radius: 6px;
  border: 4px dotted #e9e9e9;
  align-items: center;
  display: flex;
  align-items: center;
  width: ${(props) => props.width? props.width: "160"}px;
  height: ${(props) => props.height? props.height: "160"}px;
  color: #b7b2af;
  position: relative;
  justify-content: center;
  margin-right: 20px;

  &:hover {
      border: 4px dotted #fad5c4;
  }
`;
    
const UploadBtn = styled.div`
  z-index: 1;
  background-color: transparent;
  color: inherit;
  border: none;
`;

const UploadFile = styled.input`
  cursor: pointer;
  font-size: 12px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

const FilePreviewContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

const MultipleFilePreveiwContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  border-radius: 6px;
  justify-content: space-evenly;

  border: ${(props) => props.display ? "4px dotted #e9e9e9" : "none"};

  &:after {
    content: "사진을 클릭하면 썸네일로 지정돼요.";
    position: absolute;
    bottom: -30px;
    color: #f44336;
  }
`;

const MultiFileBox = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 65px;
    height: 65px;
    margin: 5px 2px;
  }
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 5px;
  &:hover {
    border: ${(props) => props.thumbnail !== undefined ? "4px solid #fb8752" : "none"};
  }

`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveBtn = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
`;

const DragDropText = styled.p`
  font-weight: bold;
  letter-spacing: 2.2px;
  margin: 0;
  display: ${(props) => props.text? "": "none"};
`;

const Thumb = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 24px;
`;

export default function FileUploadComps({text, wide, removeFunc, name, value, handle, multiple, ...otherProps}) {
  const [thumb, setThumb] = useState(value.thumbnail);
  const fileInputField = useRef(null);
  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };
  const { height, width, thumbnail } = otherProps;

  useEffect(() => {
    setThumb(value.thumbnail);
  }, [value.thumbnail]);

  return (
    <>
      <FileUploadContainer wide={wide} height={height} width={width}>
        <UploadBtn onClick={handleUploadBtnClick}>
          <AddPhotoAlternateIcon fontSize="large"/>
        </UploadBtn>
        <DragDropText text={text}>최대 5장까지 업로드할 수 있어요.</DragDropText>
        <UploadFile
          type="file"
          ref={fileInputField}
          title=""
          accept="image/*"
          name={name}
          multiple={multiple}
          onChange={handle}
        />
        {!multiple && value &&
          <FilePreviewContainer>
            <ImagePreview 
              src={URL.createObjectURL(value)}
            />
            <RemoveBtn onClick={()=>removeFunc(name)}>
              <IconButton size="small">
                <ClearIcon />
              </IconButton>
            </RemoveBtn>
          </FilePreviewContainer>
        }
        </FileUploadContainer>
        {multiple &&
          <MultipleFilePreveiwContainer display={Object.keys(value.images).length}>
            {Object.keys(value.images).map((fileName, idx) => (
              <MultiFileBox key={idx} thumbnail={thumbnail} borderFix={thumb===fileName}>
                <ImagePreview
                  id={fileName}
                  onClick={thumbnail}
                  src={URL.createObjectURL(value.images[fileName])}
                />
                {thumb === fileName &&
                  <Thumb>
                    <IconButton size="small">
                      <CheckCircleIcon />
                    </IconButton>
                  </Thumb>
                }
                <RemoveBtn onClick={()=>removeFunc(name, fileName)}>
                  <IconButton size="small">
                    <ClearIcon />
                  </IconButton>
                </RemoveBtn>
              </MultiFileBox>

            ))}
          </MultipleFilePreveiwContainer>
        }
    </>
  )
}
