import Card from "./card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { TagObject, TsumiObject } from "./tsumi";

function ResultArea() {
  const [nav, setNav] = useState<Slider>();
  const [mainSlider, setMainSlider] = useState<Slider>();
  const [index, setIndex] = useState<number>(0);
  const [tsumis, setTsumis] = useState<TsumiObject[]>([]);
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
    centerPadding: "160px",
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
    axios
      .get("https://tsuntsun-api.herokuapp.com/api/users/1/tsundokus")
      .then((res) => {
        setTsumis(res.data);
      });
  }, []);

  useEffect(() => {
    // タグ一覧
    const allTags: TagObject[] = tsumis
      .map((element: TsumiObject) => {
        return element.tags;
      })
      .flat()
      .reduce((a: TagObject[], v: TagObject) => {
        if (v && !a.includes(v)) {
          a.push(v);
        }
        return a;
      }, []);
    setTags(allTags);
    const tsumisFilterd = allTags.map((i) => {
      return tsumis.filter((tsumi: TsumiObject) =>
        tsumi.tags.some((t) => t.id === i.id)
      );
    });
    setTsumisByTag(tsumisFilterd);
  }, [tsumis]);

  const deleteFunc = (id: number) => {
    setTsumis((prev) => {
      return prev.filter((t) => t.id !== id);
    });
    console.log(tsumis);
  };

  return (
    <div className="result-area">
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
          tsumis={[]}
          deleteFunc={deleteFunc}
        ></Card>
      </Slider>
    </div>
  );
}

export default ResultArea;

const ResultTop = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  padding: 10px;
  text-align: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;

  .slick-prev:before,
  .slick-next:before {
    color: #9ab85d;
  }
`;

const FixedNavArea = styled.div`
  border-right: 0.1px solid black;
  padding-right: 20px;
  margin-right: 50px;
`;

const NavArea = styled.div`
  display: inline-block;
  width: 500px;
`;

const Nav = styled.button`
  width: 100px;
  font-size: 22px;
  background-color: white;
  border: 0px;
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
