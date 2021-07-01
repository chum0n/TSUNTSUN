import styled from "styled-components";

function AddButton() {
  return <Button>積ん読・積んサイトを追加</Button>;
}

export default AddButton;

const Button = styled.button`
  background: #9ab85d;
  border: 0.5px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 32px;
  font-size: 36px;
  line-height: 42px;
  padding: 16px 32px;
  margin: 16px auto;
  cursor: pointer;
  :hover {
    background: #7e974c;
  }
`;
