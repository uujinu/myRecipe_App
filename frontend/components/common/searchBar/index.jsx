import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";

const Form = styled.form`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 87%;
  }
`;

const SearchWrapper = styled.div`
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-top: ${(props) => (props.margin ? "10" : "0")}px;
  }
  display: flex;
  position: relative;
  margin-top: ${(props) => (props.margin ? "20" : "0")}px;
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

const SearchRes = styled.div`
  margin-left: 10px;
  background-color: #faf8f5;
  position: absolute;
  padding: 0 10px;
  width: 480px;
  max-height: 300px;
  overflow: auto;
  top: 38px;
  line-height: 35px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  z-index: 9999;
  display: ${(props) => (props.display ? "block" : "none")};
  & > div {
    cursor: pointer;
    &:hover {
      background-color: #fad5c480;
    }
  }
`;

export default function SearchBar({ margin, width, placeholder, cb, data }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [focus, setFocus] = useState(0);
  const [data, setData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFocus = (e) => {
    if (e.target.id === "searchInput") setFocus(1);
    else setFocus(0);
  };
  useEffect(async () => {
    const res = await axios.get("http://localhost:8000/posts/data/");
    setData(res.data.data);
  }, []);


  useEffect(() => {
    const res = data.filter((val) => val.indexOf(value) !== -1);
    setResult(res);
    setFocus(1);
  }, [value]);

  useEffect(() => {
    window.addEventListener("click", handleFocus);
    return () => {
      window.removeEventListener("click", handleFocus);
    };
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <SearchWrapper margin={margin || 0}>
        <SearchInput
          id="searchInput"
          width={width}
          type="text"
          placeholder={placeholder || "레시피, 재료를 검색해보세요."}
          onChange={(e) => {
            cb(e.target.value);
            setValue(e.target.value);
          }}
        />
        <SearchRes display={value && result.length && focus}>
          {result.map((res, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx}>{res}</div>
          ))}
        </SearchRes>
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </SearchWrapper>
    </Form>
  );
}
