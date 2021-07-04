import { useEffect, useState } from "react";
import styled from "styled-components";
import Tsumi, { TsumiObject } from "./tsumi";

const Card: React.FC<{
  name: string;
  tsumis: TsumiObject[];
  isHist?: boolean;
  deleteFunc: (id: number) => void;
}> = ({ name, tsumis, deleteFunc, isHist = false }) => {
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(tsumis.length <= 10);

  useEffect(() => {
    setIsLastPage(page * 10 > tsumis.length);
  }, [page, tsumis]);

  return (
    <div>
      <h2>{name}</h2>
      {tsumis.length !== 0 ? (
        <div>
          <div>
            {isLastPage ? tsumis.length : page * 10}/
            <NumBig>{tsumis.length}</NumBig>件
          </div>
          {tsumis.map((tsumi) => (
            <Tsumi
              key={tsumi.id}
              {...tsumi}
              deleteFunc={deleteFunc}
              isHist={isHist}
            ></Tsumi>
          ))}
          <div>
            {page !== 1 && (
              <PagenationButton onClick={() => setPage((p) => p - 1)}>
                {"<"}
              </PagenationButton>
            )}
            {page}
            {!isLastPage && (
              <PagenationButton onClick={() => setPage((p) => p + 1)}>
                {">"}
              </PagenationButton>
            )}
          </div>
        </div>
      ) : (
        <div>なし</div>
      )}
    </div>
  );
};

export default Card;

const NumBig = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`;

const PagenationButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  :hover {
    color: #9ab85d;
  }
`;
