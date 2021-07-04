function Login() {
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
          onClick={(e) =>
            (window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
              process.env.REACT_APP_CHANNEL_ID
            }&redirect_uri=https://tsuntsun.herokuapp.com&state=${Math.random()
              .toString(32)
              .substring(2)}&scope=profile%20openid&nonce=${Math.random()
              .toString(32)
              .substring(2)}&bot_prompt=aggressive`)
          }
        ></img>
      </div>
    </body>
  );
}

export default Login;
