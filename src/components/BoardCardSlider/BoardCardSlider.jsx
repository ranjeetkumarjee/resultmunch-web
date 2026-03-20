import { useState } from "react";
import boardcardslidercss from "./boardcardslider.module.css";

const BoardCardSlider = (props) => {
  const { title, direction } = props;
  const [cards, setCards] = useState([
    { title: "SSC JE Form", link: "#" },
    { title: "Bihar Police", link: "#" },
    { title: "UPSC NDA", link: "#" },
    { title: "Railway NTPC", link: "#" },
    { title: "Bank PO", link: "#" },
    { title: "Army Rally", link: "#" },
  ]);
  return (
    <div className={boardcardslidercss.section}>
      <h2 className={boardcardslidercss.heading}>{title}</h2>

      <div className={boardcardslidercss.slider}>
        <div
          className={
            direction === "left"
              ? boardcardslidercss.slideTrackLeft
              : boardcardslidercss.slideTrackRight
          }
        >
          {[...cards, ...cards].map((card, index) => (
            <div key={index} className={boardcardslidercss.card}>
              {/* <h3></h3> */}
              <a href={card.link}>{card.title}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardCardSlider;
