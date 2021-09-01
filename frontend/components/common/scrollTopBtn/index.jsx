import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import VerticalAlignTopRoundedIcon from "@material-ui/icons/VerticalAlignTopRounded";

const ScrollTopBtn = styled(IconButton)`
  position: fixed;
  bottom: 20px;
  right: 15px;
`;

export default function TopBtn() {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  return (
    <ScrollTopBtn onClick={scrollToTop}>
        <VerticalAlignTopRoundedIcon />
    </ScrollTopBtn>
  );
}
