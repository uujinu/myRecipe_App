import { useTheme } from "@material-ui/styles";
import Link from "next/link";
import Image from "next/image";
import * as S from "../styles/style";


export default function AuthPage(props) {
  const theme = useTheme();
  const {
    auth,
    children
  } = props;

  return (
    <S.Container theme={theme}>
      <S.AuthWrapper>
        <Link href="/" passHref>
          <S.CustomTitle auth={auth}>MyRecipe</S.CustomTitle>
        </Link>

        <S.AuthBoxWrapper>
          <S.AuthBox>
            {children}
          </S.AuthBox>
        </S.AuthBoxWrapper>
        <S.BottomWrapper>
          <S.Visible auth={auth}>
            아직 회원이 아니신가요?{" "}
            <Link href="/accounts/signup" passHref>
              <S.SignUpLink>회원가입</S.SignUpLink>
            </Link>
          </S.Visible>
          <S.SocialImage auth={auth}>
            <a href="/accounts/kakao">
              <Image
                src="/login_sns_kakao.png"
                width={50}
                height={50}
                quality={100}
              />
            </a>
            <a href="/accounts/naver">
              <Image
                src="/login_sns_naver.png"
                width={50}
                height={50}
                quality={100}
              />
            </a>
          </S.SocialImage>
        </S.BottomWrapper>
      </S.AuthWrapper>
    </S.Container>
  );
}
