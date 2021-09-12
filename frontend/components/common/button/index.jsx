import styled from "styled-components";
import { Button } from "@material-ui/core";

const CustomButton = styled(Button)`
  border-radius: 20px;
  background-color: ${(props) => props.theme.palette.primary.dark};
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};
}
`;

export default function ButtonWrapper(props) {
  const { size, disable, handleOnClick, text, ...other } = props;
  return (
    <CustomButton
      {...other}
      disabled={disable}
      onClick={handleOnClick}
      size={size || "medium"}
    >
      {text}
    </CustomButton>
  );
}
