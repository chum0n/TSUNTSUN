import Card from "./card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import styled from "styled-components";

function ResultArea() {
  const [nav, setNav] = useState<Slider>();
  const [mainSlider, setMainSlider] = useState<Slider>();
  const [index, setIndex] = useState<number>(0);

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
    slidesToShow: 5,
  };

  // 表示用、一時的
  const nameTmp = ["ALL", "Web", "App", "JS", "Ruby", "History"];

  return (
    <div className="result-area">
      <ResultTop>
        <FixedNavArea>
          <Nav
            className={index === nameTmp.length - 1 ? "current" : ""}
            onClick={(e) => mainSlider?.slickGoTo(nameTmp.length - 1)}
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
            {nameTmp.map((i) => (
              <Nav>{i}</Nav>
            ))}
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
        {nameTmp.map((i) => (
          <Card name={i}></Card>
        ))}
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
