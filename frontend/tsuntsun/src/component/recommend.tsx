import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import defaultAxios from "../utils/defaultAxios";
import { TsumiObject } from "./tsumi";

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
      <h2>今日のおすすめ</h2>
      <OneRecommend>
        {<a href={site?.url}>{site?.title}</a>}　……　{site?.requiredTime}
        で読める！
      </OneRecommend>
      <OneRecommend>
        {book?.title}　……　
        {book?.deadline && (
          <>
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
    </RecommendBox>
  );
}

export default Recommend;

const RecommendBox = styled.div`
  border: 6px dashed #9ab85d;
  box-sizing: border-box;
  text-align: left;
  padding-left: 16px;
  padding-bottom: 16px;
  padding-right: 16px;
  margin: 16px auto;
`;

const OneRecommend = styled.div`
  font-size: large;
  margin: 8px 0;
`;
