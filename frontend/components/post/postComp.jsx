import styled from "styled-components";
import { useState, useRef } from "react";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from "@material-ui/core";
import imageCompression from "browser-image-compression";


const FileUploadContainer = styled.section`
  position: relative;
  margin: 25px 0 15px;
  border: 2px dotted lightgray;
  padding: 35px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const FormField = styled.input`
  font-size: 18px;
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

const InputLabel = styled.label`
  top: -21px;
  font-size: 13px;
  color: black;
  left: 0;
  position: absolute;
`;

const DragDropText = styled.p`
  font-weight: bold;
  letter-spacing: 2.2px;
  margin-top: 0;
  text-align: center;
`;

const UploadFileBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid #3498db;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  color: #3498db;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-family: "Open Sans", sans-serif;
  width: 45%;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;

  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: #3498db;
    z-index: -1;
    transition: width 250ms ease-in-out;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;

    &:after {
      width: 110%;
    }
  }

  &:focus {
    outline: 0;
    background: transparent;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

const FilePreviewContainer = styled.article`
  margin-bottom: 35px;

  span {
    font-size: 14px;
  }
`;

const PreviewList = styled.section`
  display: flex;
  margin-top: 10px;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;


const RemoveBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;


const PreviewContainer = styled.section`
  padding: 0.25rem;
  width: 20%;
  height: 120px;
  border-radius: 6px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.75;
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0.4em;
  }
`;

const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  object-fit: cover;
`;


const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;


const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {

  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});


  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const convertNestedObjectToArray = (nestedObj) => {
    Object.keys(nestedObj).map((key) => nestedObj[key]);
  }

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  /*
  const addNewFiles = (newFiles) => {
    if (Object.keys(files).length >= 5) {
      alert("최대 5장까지 첨부 가능합니다.");
    };

    console.log("현재 files: ", files)

    const options = { 
      maxSizeMB: 2, 
      maxWidthOrHeight: 100
    }

    const promises = [];

    for (let file of newFiles) {
      const compressedFile = imageCompression(file, options);
      promises.push(imageCompression(file, options));
      //const compressedFile =  imageCompression(file, options);
      files[file.name] = compressedFile;
    }


    //return { ...files };
    return promises;
  };
  */

  const addNewFiles = (newFiles) => {

    const options = { 
      maxSizeMB: 2, 
      maxWidthOrHeight: 100
    }
    const promises = [];
    for (let file of newFiles) {
      //
      //const compressedFile = imageCompression(file, options);
      //promises.push(compressedFile);
      //
      //files[file.name] = compressedFile;
      promises.push(imageCompression(file, options));
    }
    //return { ...files };
    return promises;
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      const promises = addNewFiles(newFiles);
      Promise.all(promises)
      .then(result => {    
        Object.keys(result).map((fileName, index) => {
          const file = result[fileName].name;
          files[file] = result[fileName];
        });
        console.log("result: ", files);
        setFiles(files);
        callUpdateFilesCb(files);
      })
    }
  }


  /*
  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {

      const options = { 
        maxSizeMB: 2, 
        maxWidthOrHeight: 100
      }

      const promises = [];
      for (let file of newFiles) {
        promises.push(imageCompression(file, options));
      }
      //const promises = addNewFiles(newFiles);
      Promise.all(promises)
      .then(updatedFiles => {
        //console.log("files: ", files)
        console.log("result: ", updatedFiles)

        setFiles(
          
          updatedFiles
        );
        callUpdateFilesCb(updatedFiles);
      }).catch(e => {
        console.log("e: ", e);
      })
      //const updatedFiles = Promise.all(addNewFiles(newFiles));
    }
  };
*/
  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>파일 업로드</DragDropText>
        <UploadFileBtn onClick={handleUploadBtnClick}>
          <AddToPhotosIcon />
        </UploadFileBtn>
        <FormField 
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>

      {/* 프리뷰 */}
      <FilePreviewContainer>
        <span>업로드한 파일</span>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            const isImageFile = true;
            //const isImageFile = file.type.split("/")[0] === "image";
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <RemoveBtn isImageFile={isImageFile}>
                    <IconButton onClick={() => removeFile(fileName)}>
                      <DeleteIcon />
                    </IconButton>
                  </RemoveBtn>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
  </>
  )
}

export default FileUpload;
