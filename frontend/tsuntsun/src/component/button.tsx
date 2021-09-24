import { ReactNode } from "react";
import styled from "styled-components";

const Button: React.FC<{
  children: ReactNode;
  onClick: (e: any) => void;
}> = ({ children, onClick }) => {
  return <NomalButton onClick={(e) => onClick(e)}>{children}</NomalButton>;
};

export const DarkButton: React.FC<{
  children: ReactNode;
  onClick: (e: any) => void;
}> = ({ children, onClick }) => {
  return <OtherButton onClick={(e) => onClick(e)}>{children}</OtherButton>;
};

export default Button;

const NomalButton = styled.button`
  box-sizing: border-box;
  display: flex;
  padding: 8px 16px;
  margin: 4px auto;
  font-size: large;
  white-space: nowrap;
  vertical-align: center;
  cursor: pointer;
  background: #eaf5d3;
  border: none;
  border-radius: 32px;

  :hover {
    background: #9ab85d;
  }
`;
const OtherButton = styled.button`
  box-sizing: border-box;
  padding: 8px 16px;
  margin: 4px auto;
  cursor: pointer;
  background: #9ab85d;
  border: 0.5px solid #b9b9b9;
  border-radius: 32px;

  :hover {
    background: #9ab85d;
  }
`;
