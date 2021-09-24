import defaultAxios from "../utils/defaultAxios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DarkButton } from "./button";
import { TagObject } from "./tsumi";

function SearchArea() {
  const [radio, setRadio] = useState<string>("全て");
  const [tags, setTags] = useState<TagObject[]>([]);

  useEffect(() => {
    defaultAxios.get("/tags").then((res) => {
      setTags(res.data);
    });
  }, []);
  return (
    <Area className="search-area">
      <OneSearchArea>
        <Label>種類</Label>
        <input
          type="radio"
          name="cat"
          value="全て"
          checked={radio === "全て"}
          onChange={() => setRadio("全て")}
        />
        全て
        <input
          type="radio"
          name="cat"
          value="本のみ"
          checked={radio === "本のみ"}
          onChange={() => setRadio("本のみ")}
        />
        本のみ
        <input
          type="radio"
          name="cat"
          value="サイトのみ"
          checked={radio === "サイトのみ"}
          onChange={() => setRadio("サイトのみ")}
        />
        サイトのみ
      </OneSearchArea>

      <OneSearchArea>
        <Label>タグ</Label>
        <select name="tag">
          <option value="" disabled></option>
          {tags.map((t) => (
            <option value={t.id}>{t.name}</option>
          ))}
        </select>
      </OneSearchArea>
      <OneSearchArea>
        <Label>キーワード</Label>
        <input type="search"></input>
      </OneSearchArea>
      <ButtonWrap>
        <DarkButton onClick={() => {}}>検索</DarkButton>
      </ButtonWrap>
    </Area>
  );
}

export default SearchArea;

const Area = styled.div`
  padding: 16px;
  padding-left: 48px;
  text-align: left;
  background: #eaf5d3;
`;

const OneSearchArea = styled.div`
  margin: 5px 0;
`;

const ButtonWrap = styled.div`
  text-align: center;
`;

const Label = styled.label`
  display: inline-block;
  width: 100px;
`;
