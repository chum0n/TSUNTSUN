import { useAuth } from "../contexts/AuthContext";

function Login() {
  const auth = useAuth();
  return (
    <body>
      <div className="login">
        <img
          src={`${process.env.PUBLIC_URL}/bg.jpg`}
          alt="背景"
          style={{ width: "100%" }}
        ></img>
        <img
          src={`${process.env.PUBLIC_URL}/LineLoginButtonImage/images/DeskTop/2x/44dp/btn_login_base.png`}
          alt="lINEでログイン"
          onClick={() => (window.location.href = auth.getloginHref())}
        ></img>
      </div>
    </body>
  );
}

export default Login;
