import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "../../common/header";
import Footer from "../../common/footer";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export default function CommonLayout({ fix, children }) {
  return (
    <>
      <PageContainer>
        <Header fix={fix || 0} />
        {children}
        <Footer />
      </PageContainer>
    </>
  );
}

CommonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
