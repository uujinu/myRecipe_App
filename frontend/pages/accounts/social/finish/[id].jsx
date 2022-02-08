/* eslint-disable camelcase */
import axios from "axios";
import nookies from "nookies";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { getUserInfo } from "@slice/user";
import { socialLogin } from "@slice/login";

export default function SocialFinish({ access_token, reauthenticate }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    const res = axios.get(`http://localhost:8000/accounts/users/${id}/`);
    res
      .then((r) => {
        dispatch(getUserInfo(r.data));
        dispatch(socialLogin(access_token));
      })
      .catch((e) => {
        alert("[error] ", e);
      });
    if (reauthenticate === null) router.push("/");
    else router.push(`/manage/${reauthenticate}`);
  });
  return <div />;
}

export const getServerSideProps = (ctx) => {
  const { access_token, reauthenticate } = nookies.get(ctx);
  nookies.destroy(ctx, "access_token", { path: "/" });

  return {
    props: {
      access_token,
      reauthenticate: reauthenticate || null,
    },
  };
};
