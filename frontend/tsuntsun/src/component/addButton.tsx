import styled from "styled-components";
import { RiAddFill } from "react-icons/ri";

function AddButton() {
  return (
    <Button>
      <RiAddFill />
      積ん読・積んサイトを追加
    </Button>
  );
}

export default AddButton;

const Button = styled.button`
  box-sizing: border-box;
  height: 42px;
  padding: 10px 20px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  background: #9ab85d;
  border: 0.5px solid #b9b9b9;
  border-radius: 32px;

  :hover {
    background: #7e974c;
  }
`;
