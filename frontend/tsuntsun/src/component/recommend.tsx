import { useEffect, useState } from "react";
import styled from "styled-components";
import defaultAxios from "../utils/defaultAxios";
import Color from "../const/Color";
import { TsumiObject } from "./tsumi";
import { RiBookFill, RiComputerLine } from "react-icons/ri";

function Recommend() {
  const today = new Date();

  const [book, setBook] = useState<TsumiObject>();
  const [site, setSite] = useState<TsumiObject>();

  useEffect(() => {
    defaultAxios.get("/tsundokus").then((res) => {
      const recBook = res.data.find((t: TsumiObject) => t.category === "book");
      setBook(recBook);
      const recSite = res.data.find((t: TsumiObject) => t.category === "site");
      setSite(recSite);
    });
  }, []);
  return (
    <RecommendBox className="recommend">
      <TitleArea>
        <h3>今日のおすすめ</h3>
      </TitleArea>
      <BodyArea>
        <OneRecommend>
          <RiBookFill />
          {<a href={site?.url}>{site?.title}</a>}
          {site?.requiredTime && (
            <>
              　……　{site?.requiredTime}
              で読める！
            </>
          )}
        </OneRecommend>
        <OneRecommend>
          <RiComputerLine />
          {book?.title}
          {book?.deadline && (
            <>
              　……　
              {Math.floor(
                (Date.parse(book?.deadline) - today.getTime()) / 86400000
              ) >= 0
                ? "あと"
                : ""}
              {Math.abs(
                Math.floor(
                  (Date.parse(book?.deadline) - today.getTime()) / 86400000
                )
              )}
              日
              {Math.floor(
                (Date.parse(book?.deadline) - today.getTime()) / 86400000
              ) < 0
                ? "経過"
                : ""}
            </>
          )}
        </OneRecommend>
      </BodyArea>
    </RecommendBox>
  );
}

export default Recommend;

const RecommendBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 120px;
  margin: 16px auto;
  text-align: left;
  border-radius: 10px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  padding: 0 32px;
  white-space: nowrap;
  background-color: ${Color.PRIMARY};
  border-radius: 10px 0 0 10px;
`;
const BodyArea = styled.div`
  width: 100%;
  padding-right: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  background-color: white;
  border-radius: 0 10px 10px 0;
`;

const OneRecommend = styled.div`
  height: 50%;
  margin: 8px 0;
  font-size: large;
`;
