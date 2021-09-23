import SignUpForm from "./signupForm";
import AuthPage from "../login/loginPage";


export default function SignUp() {
  return (
    <AuthPage auth="signup">
      <SignUpForm />
    </AuthPage>
  );
}
