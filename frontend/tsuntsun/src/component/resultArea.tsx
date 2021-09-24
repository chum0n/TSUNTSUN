import Card from "./card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import defaultAxios from "../utils/defaultAxios";
import { TagObject, TsumiObject } from "./tsumi";
import Color from "../const/Color";

function ResultArea() {
  const [nav, setNav] = useState<Slider>();
  const [mainSlider, setMainSlider] = useState<Slider>();
  const [index, setIndex] = useState<number>(0);
  const [tsumis, setTsumis] = useState<TsumiObject[]>([]);
  const [deleteTsumis, setDeleteTsumis] = useState<TsumiObject[]>([]);
  const [tags, setTags] = useState<TagObject[]>([]);
  const [tsumisByTag, setTsumisByTag] = useState<TsumiObject[][]>([]);

  // スライダー用設定
  const settings = {
    centerMode: true,
    infinite: true,
    swipeToSlide: true,
    swipe: true,
    focusOnSelect: true,
    speed: 500,
    centerPadding: "170px",
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settingsNav = {
    accessibility: false,
    centerMode: true,
    infinite: true,
    draggable: false,
    swipe: false,
    focusOnSelect: true,
    centerPadding: "10px",
    slidesToShow: tags.length >= 3 ? 5 : tags.length + 2,
  };

  useEffect(() => {
    defaultAxios.get("/tsundokus").then((res) => {
      setTsumis(res.data);
    });
    defaultAxios.get("/tags").then((res) => {
      setTags(res.data);
    });
  }, []);

  useEffect(() => {
    const tsumisFilterd = tags.map((i) => {
      return tsumis.filter((tsumi: TsumiObject) =>
        tsumi.tags.some((t) => t.id === i.id)
      );
    });
    setTsumisByTag(tsumisFilterd);
  }, [tags, tsumis]);

  const next = () => {
    if (mainSlider !== undefined) {
      mainSlider.slickNext();
    }
  };
  const previous = () => {
    if (mainSlider !== undefined) {
      mainSlider.slickPrev();
    }
  };

  const deleteFunc = (id: number) => {
    const willDelete = tsumis.find((t) => t.id === id);
    if (willDelete) {
      defaultAxios.delete(`/tsundokus/${id}`).then((res) => {
        setDeleteTsumis((prev) => [...prev, willDelete]);
        setTsumis((prev) => {
          return prev.filter((t) => t.id !== id);
        });
        console.log(tsumis);
      });
    }
  };

  return (
    <div className="result-area" style={{ position: "relative" }}>
      <ResultTop>
        <FixedNavArea>
          <Nav
            className={index === tags.length + 1 ? "current" : ""}
            onClick={(e) => mainSlider?.slickGoTo(tags.length + 1)}
          >
            History
          </Nav>
          <Nav
            className={index === 0 ? "current" : ""}
            onClick={(e) => mainSlider?.slickGoTo(0)}
          >
            ALL
          </Nav>
        </FixedNavArea>
        <NavArea>
          <Slider
            className="nav"
            {...settingsNav}
            asNavFor={mainSlider}
            ref={(slider) => (slider ? setNav(slider) : null)}
          >
            <Nav key="ALL-default">ALL</Nav>
            {tags.map((t) => (
              <Nav key={t.id}>{t.name}</Nav>
            ))}
            <Nav key="Hist-default">History</Nav>
          </Slider>
        </NavArea>
      </ResultTop>
      <FixedDiv>
        <MoveButton onClick={() => previous()}>{"<"}</MoveButton>
        <MoveButton onClick={() => next()}>{">"}</MoveButton>
      </FixedDiv>
      <Slider
        className="slider"
        {...settings}
        asNavFor={nav}
        ref={(slider) => (slider ? setMainSlider(slider) : null)}
        beforeChange={(oldIndex, newIndex) => setIndex(newIndex)}
      >
        <Card
          name="ALL"
          key="ALL-default"
          tsumis={tsumis}
          deleteFunc={deleteFunc}
        ></Card>
        {tags.map(
          (t, index) =>
            tsumisByTag[index] && (
              <Card
                name={t.name}
                key={index}
                tsumis={tsumisByTag[index]}
                deleteFunc={deleteFunc}
              ></Card>
            )
        )}
        <Card
          name="Hist"
          key="Hist-default"
          isHist={true}
          tsumis={deleteTsumis}
          deleteFunc={deleteFunc}
        ></Card>
      </Slider>
    </div>
  );
}

export default ResultArea;

const ResultTop = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  margin: 0 auto;
  text-align: center;
  background-color: ${Color.BACKGROUND};

  .slick-prev::before,
  .slick-next::before {
    color: #9ab85d;
  }
`;

const FixedNavArea = styled.div`
  padding-right: 20px;
  margin-right: 50px;
  background-color: ${Color.BACKGROUND};
  border-right: 0.1px solid black;
`;

const NavArea = styled.div`
  display: inline-block;
  width: 500px;
  background-color: ${Color.BACKGROUND};
`;

const Nav = styled.button`
  width: 100px;
  font-size: 22px;
  background-color: ${Color.BACKGROUND};
  border: 0;
  border-bottom: 2px solid transparent;

  :hover {
    border-bottom: 2px solid #9ab85d;
  }

  .slick-current &,
  &.current {
    font-weight: bold;
    border-bottom: 2px solid #9ab85d;
  }
`;

const FixedDiv = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 50vh;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 0 calc(40vw - 400px - 16px);
`;
const MoveButton = styled.button`
  appearance: none;
  font-size: 36px;
  font-weight: 700;
  color: ${Color.DARK};
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
