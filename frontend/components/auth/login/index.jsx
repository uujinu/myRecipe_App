import LoginForm from "./loginForm";
import AuthPage from "./loginPage";


export default function Login() {
  return (
    <AuthPage auth="login">
      <LoginForm />
    </AuthPage>
  );
}
