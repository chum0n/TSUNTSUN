import styled from "styled-components";

function Header() {
  return (
    <HeaderBase className="header">
      <Logo href="." className="brand">
        ロゴ TsunTsun
      </Logo>
      <div>チュモンさん、こんにちは　設定 ログアウト</div>
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
