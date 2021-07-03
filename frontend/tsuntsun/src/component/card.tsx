import styled from "styled-components";
import Tsumi, { TsumiObject } from "./tsumi";

const Card: React.FC<{ name: string; tsumis: TsumiObject[] }> = ({
  name,
  tsumis,
}) => {
  const list: JSX.Element[] = [];
  tsumis.forEach((tsumi) => {
    list.push(<Tsumi key={tsumi.id} {...tsumi}></Tsumi>);
  });
  return (
    <div>
      <h2>{name}</h2>
      <div>
        10/<NumBig>{tsumis.length}</NumBig>件
      </div>
      {list}
    </div>
  );
};

export default Card;

const NumBig = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`;
