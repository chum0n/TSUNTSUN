import { useEffect, useState } from "react";
import styled from "styled-components";
import Tsumi, { TsumiObject } from "./tsumi";
import { CgCoffee } from "react-icons/cg";

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
    <CardBase>
      <div>
        <h2>{name}</h2>
        <PageDisplay>
          {isLastPage ? tsumis.length : page * 10}
          <Space>/</Space>
          <NumBig>{tsumis.length}</NumBig>
          <Space>件</Space>
        </PageDisplay>
      </div>
      {tsumis.length !== 0 ? (
        <div>
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
        !isHist && (
          <>
            <div>全部読みました！お疲れ様です。</div>
            <div>
              一息ついて、新しい出会いを探しにいきましょう
              <CgCoffee />
            </div>
          </>
        )
      )}
    </CardBase>
  );
};

export default Card;

const CardBase = styled.div`
  position: relative;
  width: 700px;
  min-height: 7000px;
  padding: 20px;
  margin: 10px auto;
  background-color: white;
  border-radius: 10px;
`;

const PageDisplay = styled.div`
  position: absolute;
  top: 40px;
  right: 100px;
`;

const NumBig = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`;

const Space = styled.span`
  margin: 4px;
`;

const PagenationButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;

  :hover {
    color: #9ab85d;
  }
`;
