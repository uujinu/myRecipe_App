/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

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

const SearchButton = styled.button`
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

export default function SearchBar({ margin, width, placeholder, searchVal }) {
  const [value, setValue] = useState(searchVal || "");
  const [result, setResult] = useState([]);
  const [focus, setFocus] = useState(0);
  const [data, setData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) alert("검색어를 입력하세요.");
    else {
      router.push(`/posts/search?q=${encodeURIComponent(value)}`);
    }
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
    const ary = [];
    data.map((val) => {
      if (val.indexOf(value) !== -1) ary.push(val);
    });

    setResult(ary);
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
            setValue(e.target.value);
          }}
          value={value}
          autoComplete="off"
        />
        <SearchRes display={value && result.length && focus}>
          {result.map((res, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/posts/search?q=${encodeURIComponent(value)}`);
              }}
            >
              {res}
            </div>
          ))}
        </SearchRes>
        <SearchButton type="submit">
          <SearchIcon />
        </SearchButton>
      </SearchWrapper>
    </Form>
  );
}
