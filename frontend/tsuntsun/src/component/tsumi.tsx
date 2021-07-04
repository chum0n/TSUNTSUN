import styled from "styled-components";
import Button from "./button";
import Tag from "./tag";
const mojs = require("@mojs/core");

export type TsumiObject = {
  author: string;
  category: string;
  createdAt?: string;
  deadline?: string;
  id: number;
  requiredTime: string;
  title: string;
  url: string;
  tags: TagObject[];
};

export type TagObject = {
  id: string;
  name: string;
};

const burst = new mojs.Burst({
  left: 0,
  top: 0,
  radius: { 0: 30 },
  angle: "rand(0, 360)",
  children: {
    shape: "line",
    stroke: "black",
    fill: "none",
    scale: 1,
    scaleX: { 1: 0 },
    easing: "cubic.out",
    duration: 1000,
  },
});

const bubbles = new mojs.Burst({
  left: 0,
  top: 0,
  radius: { 100: 200 },
  count: 40,
  timeline: { delay: 100 },
  children: {
    fill: [
      { "#DC93CF": "#E3D36B" },
      { "#91D3F7": "#9AE4CF" },
      { "#DC93CF": "#E3D36B" },
      { "#CF8EEF": "#CBEB98" },
      { "#F48BA2": "#CF8EEF" },
      { "#A7ECD0": "#9AE4CF" },
      { "#87E9C6": "#F48BA2" },
      { "#D58EB3": "#E0B6F5" },
      { "#F48BA2": "#F48BA2" },
      { "#91D3F7": "#A635D9" },
      { "#CF8EEF": "#CBEB98" },
      { "#87E9C6": "#F48BA2" },
    ],
    scale: { 1: 0, easing: "quad.in" },
    pathScale: [0.8, null],
    duration: [500, 700],
    easing: "quint.out",
    radius: { 0: "rand(6, 10)" },
    degreeShift: "rand(-50, 50)",
    delay: "rand(0, 250)",
  },
});

const Tsumi: React.FC<
  TsumiObject & { deleteFunc: (id: number) => void; isHist: boolean }
> = ({
  id,
  url,
  title,
  createdAt,
  requiredTime,
  deadline,
  tags,
  deleteFunc,
  isHist,
}) => {
  const today = new Date();
  return (
    <Article key={id}>
      <ContentWrap>
        <Title>{url === "" ? title : <a href={url}>{title}</a>}</Title>
        <StatusBlack>
          <Status>
            <NumBig>
              {createdAt &&
                Math.floor(
                  (today.getTime() - Date.parse(createdAt)) / 86400000
                )}
            </NumBig>
            日経過
          </Status>
          <Status>
            {requiredTime && (
              <>
                <NumBig>{requiredTime}</NumBig>
                で読める
              </>
            )}
          </Status>
          <Status>
            {deadline ? (
              <>
                {Math.floor(
                  (Date.parse(deadline) - today.getTime()) / 86400000
                ) >= 0
                  ? "あと"
                  : ""}
                <NumBig>
                  {Math.abs(
                    Math.floor(
                      (Date.parse(deadline) - today.getTime()) / 86400000
                    )
                  )}
                </NumBig>
                日
                {Math.floor(
                  (Date.parse(deadline) - today.getTime()) / 86400000
                ) < 0
                  ? "経過"
                  : ""}
              </>
            ) : null}
          </Status>
        </StatusBlack>
        <StatusBlack>
          {tags.map((t) => (
            <Tag key={t.id} name={t.name}></Tag>
          ))}
        </StatusBlack>
      </ContentWrap>
      <Button
        onClick={(e) => {
          deleteFunc(id);
          if (!isHist) {
            burst.tune({ x: e.pageX, y: e.pageY }).generate().replay();
            bubbles.tune({ x: e.pageX, y: e.pageY }).generate().replay();
          }
        }}
      >
        {isHist ? "戻す" : "読んだ"}
      </Button>
    </Article>
  );
};

export default Tsumi;

const Title = styled.h3`
  text-align: left;
`;

const Article = styled.article`
  display: flex;
  align-items: center;
  max-width: 700px;
  margin: 20px auto;
  padding: 20px 0;
  border-bottom: 0.5px solid #b9b9b9;
`;

const StatusBlack = styled.div`
  display: flex;
`;

const Status = styled.div`
  display: inline-block;
  width: 30%;
  text-align: left;
  margin: 4px;
`;

const NumBig = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`;

const ContentWrap = styled.div`
  flex: auto;
`;
