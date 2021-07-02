import styled from "styled-components";
import Tsumi from "./tsumi";

function Card() {
  const list = [];
  for (let index = 0; index < 10; index++) {
    list.push(<Tsumi></Tsumi>);
  }
  return (
    <div>
      <h2>ALL</h2>
      <div>
        10/<NumBig>20</NumBig>件
      </div>
      {list}
    </div>
  );
}

export default Card;

const NumBig = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`;
