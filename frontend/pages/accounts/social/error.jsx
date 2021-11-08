import nookies from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

export default function SocialError({ errorMsg }) {
  const router = useRouter();
  useEffect(() => {
    alert(errorMsg);
    router.push("/accounts/login");
  });

  return <div />;
}

export const getServerSideProps = (ctx) => {
  let errorMsg = "";

  function error(code) {
    if (code === "platformerror")
      errorMsg =
        "해당 이메일은 일반 계정 또는 다른 소셜플랫폼으로 가입되었습니다.";
    else if (code === "emailnoneerror")
      errorMsg = "가입시 이메일은 필수입니다.";
  }

  try {
    errorMsg = nookies.get(ctx).error;
    nookies.destroy(ctx, "error", { path: "/" });
    error(errorMsg);
  } catch (e) {
    errorMsg = "로그인에 실패하였습니다.";
  }

  return { props: { errorMsg } };
};
