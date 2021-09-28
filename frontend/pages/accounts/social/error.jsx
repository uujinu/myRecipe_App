import nookies from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";


export default function SocialError({error_msg}) {
  const router = useRouter();
  useEffect(() => {
    alert(error_msg);
    router.push("/accounts/login");
  });

  return(
    <div />
  );
};

export const getServerSideProps = (ctx) => {
  let error_msg = "";

  function error(code) {
    if (code === "platformerror")
      error_msg = "해당 이메일은 일반 계정 또는 다른 소셜플랫폼으로 가입되었습니다."
    else if (code === "emailnoneerror")
      error_msg = "가입시 이메일은 필수입니다."
  }

  try {
    error_msg = nookies.get(ctx).error;
    nookies.destroy(ctx, 'error', { path: "/" });
    error(error_msg);
  } catch (error) {
    error_msg = "로그인에 실패하였습니다."
  }
  
  return { props: { error_msg }};
}
