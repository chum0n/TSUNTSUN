import { ReactNode } from "react";
import styled from "styled-components";

const Button: React.FC<{
  children: ReactNode;
  onClick: (e: any) => void;
}> = ({ children, onClick }) => {
  return <NomalButton onClick={(e) => onClick(e)}>{children}</NomalButton>;
};

export default Button;

const NomalButton = styled.button`
  background: #eaf5d3;
  border: 0.5px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 32px;
  padding: 8px 16px;
  margin: 4px auto;
  cursor: pointer;
  :hover {
    background: #9ab85d;
  }
`;
