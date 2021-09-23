import styled from "styled-components";
import { Button } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

const CustomButton = styled(Button)`
  border-radius: 20px;
  background-color: ${(props) => props.theme.palette.primary.dark};
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};
}
`;

const Loading = styled(CircularProgress)`
  position: absolute;
  right: 60%;
`;

export default function ButtonWrapper(props) {
  const { size, disable, handleOnClick, text, loading, ...other } = props;
  return (
    <CustomButton
      {...other}
      disabled={disable}
      onClick={handleOnClick}
      size={size || "medium"}
      aria-busy={true}
    >
      <Loading aria-describedby size={25} color="secondary" variant={loading || "determinate"} />
      {text}
    </CustomButton>
  );
}
