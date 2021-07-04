import styled from "styled-components";

const Header: React.FC<{
  name?: string;
}> = ({ name }) => {
  const logout = () => {
    window.location.href = "https://tsuntsun.herokuapp.com/login";
    // axios
    //   .get("https://tsuntsun-api.herokuapp.com/api/line_logout")
    //   .then((res) => {
    //     console.log(res);
    //     window.location.href = "https://tsuntsun.herokuapp.com/login";
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
  };
  return (
    <HeaderBase className="header">
      <Logo href="." className="brand">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt=""
          style={{ height: "40px" }}
        ></img>
        <img
          src={`${process.env.PUBLIC_URL}/tsuntsun.png`}
          alt=""
          style={{ height: "40px" }}
        ></img>
      </Logo>
      <div>
        {name ? name : "チュモン"}さん、こんにちは　設定
        <LogoutButton onClick={() => logout()}>ログアウト</LogoutButton>
      </div>
    </HeaderBase>
  );
};

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

const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
`;
