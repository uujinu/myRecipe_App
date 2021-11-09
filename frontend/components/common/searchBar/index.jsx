import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

const SearchWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-top: 10px;
    width: 87%;
  }
  display: flex;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  padding: 5px 20px;
  margin-right: 7px;
  width: ${(props) => (props.width ? props.width : "500")}px;
  border-radius: 15px;
  border: 1px solid #0000001f;
  height: 38px;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.div`
  height: 40px;
  cursor: pointer;
  display: contents;
  & > .MuiSvgIcon-root {
    height: 37px;
    width: 37px;
  }
`;

export default function SearchBar({ placeholder, cb }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder={placeholder || "레시피를 검색해보세요."}
          onChange={(e) => cb(e.target.value)}
        />
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </SearchWrapper>
    </form>
  );
}
