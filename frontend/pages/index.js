import CommonLayout from "@components/layout/common";
import TopSection from "@components/main/TopSection";
import MainContents from "../components/main/MainContents";
import TopBtn from "../components/common/scrollTopBtn";

export default function MainPage() {

  return (
    <CommonLayout>
      <TopSection />
      <MainContents />
      <TopBtn />
    </CommonLayout>
  );
}
