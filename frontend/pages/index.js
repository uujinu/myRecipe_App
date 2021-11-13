import CommonLayout from "@components/layout/common";
import TopSection from "@components/main/TopSection";
import MainContents from "@components/main/MainContents";
import TopBtn from "@components/common/scrollTopBtn";
import axios from "axios";

export default function MainPage({ list }) {
  return (
    <CommonLayout fix={0}>
      <TopSection />
      <MainContents list={list} />
      <TopBtn />
    </CommonLayout>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:8000/posts/post/");
  return {
    props: {
      list: res.data,
    },
  };
}
