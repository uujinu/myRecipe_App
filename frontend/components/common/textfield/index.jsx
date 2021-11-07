import styled from "styled-components";
import { TextField } from "@material-ui/core";

const CustomTextField = styled(TextField)`
  padding-bottom: 25px;
  width: 100%;
`;

export default function TextFieldWrapper(props) {
  return <CustomTextField {...props} />;
}
