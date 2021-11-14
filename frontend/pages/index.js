/* eslint-disable array-callback-return */
import CommonLayout from "@components/layout/common";
import TopSection from "@components/main/TopSection";
import MainContents from "@components/main/MainContents";
import TopBtn from "@components/common/scrollTopBtn";
import axios from "axios";

export default function MainPage({ list, recipe }) {
  return (
    <CommonLayout fix={0}>
      <TopSection />
      <MainContents list={list} recipe={recipe} />
      <TopBtn />
    </CommonLayout>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:8000/posts/post/");
  let openapi = await axios.get(
    "http://211.237.50.150:7080/openapi/2c39b87fe912e7aad66984f6058e96543ece1f63ce8457d5ef98d52ce66b1f95/json/Grid_20150827000000000226_1/1/600",
  );
  openapi = openapi.data.Grid_20150827000000000226_1.row;

  const ary = [];
  Object.values(openapi).map((value) => {
    if (ary.indexOf(value.RECIPE_NM_KO) === -1) ary.push(value.RECIPE_NM_KO);
    else console.log(value.RECIPE_NM_KO);
  });

  res.data.map((val) => {
    ary.push(val.title);
  });

  return {
    props: {
      list: res.data,
      recipe: ary,
    },
  };
}
