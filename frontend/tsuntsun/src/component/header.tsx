import styled from "styled-components";

function Header() {
  return (
    <HeaderBase className="header">
      <Logo href="." className="brand">
        ロゴ TsunTsun
      </Logo>
      <div>
        チュモンさん、こんにちは　設定
        <img
          src={`${process.env.PUBLIC_URL}/LineLoginButtonImage/images/DeskTop/1x/20dp/btn_login_base.png`}
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
    </HeaderBase>
  );
}

export default Header;

const HeaderBase = styled.header`
  background: #eaf5d3;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  text-decoration: none;
`;
