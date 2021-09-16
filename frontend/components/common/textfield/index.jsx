import styled from "styled-components";
import { TextField } from "@material-ui/core";

const CustomTextField = styled(TextField)`
  padding-bottom: 25px;
`;

export default function TextFieldWrapper(props) {
  return (
    <CustomTextField {...props}/>
  );
}
