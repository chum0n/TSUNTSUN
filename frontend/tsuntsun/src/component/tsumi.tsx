import styled from "styled-components";
import {
  RiCalendar2Fill,
  RiCalendarCheckFill,
  RiTimerLine,
  RiCheckLine,
  RiExternalLinkLine,
} from "react-icons/ri";
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
  return (
    <Article key={id}>
      <ContentWrap>
        <Title>
          {url === "" ? (
            title
          ) : (
            <NoStyleLink href={url} target="_blank" rel="noopener noreferrer">
              {title}
              <ExternalIcon>
                <RiExternalLinkLine size="0.8em" />
              </ExternalIcon>
            </NoStyleLink>
          )}
        </Title>
        <StatusBlack>
          <Status>
            <Icon>
              <RiCalendar2Fill size="1.5rem" />
            </Icon>
            {createdAt && subDate(createdAt) < 0 && (
              <>
                <NumBig>{-subDate(createdAt)}</NumBig>日前
              </>
            )}
            {createdAt && subDate(createdAt) === 0 && <>本日</>}
          </Status>
          <Status>
            <Icon>
              <RiCalendarCheckFill size="1.5rem" />
            </Icon>
            {deadline && subDate(deadline) !== 0 && (
              <>
                {subDate(deadline) > 0 && "あと"}
                <NumBig>{Math.abs(subDate(deadline))}</NumBig>日
                {subDate(deadline) < 0 && "経過"}
              </>
            )}
            {deadline && subDate(deadline) === 0 && <p>本日</p>}
          </Status>
          <Status>
            {requiredTime && (
              <>
                <Icon>
                  <RiTimerLine size="1.5rem" />
                </Icon>
                <NumBig>{requiredTime}</NumBig>
                分で読める
              </>
            )}
          </Status>
        </StatusBlack>
        <StatusBlack>
          {[{ id: 1, name: "aaa" }].map((t) => (
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
        <RiCheckLine />
        {isHist ? "戻す" : "読んだ"}
      </Button>
    </Article>
  );
};

const subDate: (date: string) => number = (date) => {
  const today = new Date();
  return Math.floor((Date.parse(date) - today.getTime()) / 86400000);
};

export default Tsumi;

const Title = styled.h3`
  margin-left: 8px;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
`;

const Article = styled.article`
  display: flex;
  align-items: center;
  max-width: 600px;
  padding: 20px 0;
  margin: 20px auto;
  font-size: 14px;
  border-bottom: 0.5px solid #b9b9b9;
`;

const NoStyleLink = styled.a`
  color: inherit;
  text-decoration: none;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Icon = styled.div`
  display: inline-flex;
  margin-right: 10px;
  color: #30371f;
`;

const ExternalIcon = styled.div`
  display: inline-flex;
  margin-left: 4px;
  color: #30371f;
`;

const StatusBlack = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

const Status = styled.div`
  display: inline-flex;
  align-items: center;
  width: 25%;
  margin: 4px;
  text-align: left;
`;

const NumBig = styled.span`
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
`;

const ContentWrap = styled.div`
  flex: auto;
`;
