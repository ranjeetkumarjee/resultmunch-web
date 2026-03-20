import { useState } from "react";
import RedBlinkLive from "../RedBlinkLive/RedBlinkLive";
import boardcss from "./Board.module.css";
import BoardCardSlider from "../BoardCardSlider/BoardCardSlider";
const Board = () => {
  const [active, setActive] = useState("government");
  const [importantjobs, setImportantJobs] = useState(() => {
    return [1, 2, 3, 4, 5, 6];
  });
  return (
    <div className={boardcss.boardsec}>
      <div className={boardcss.websitedescriptionsec}>
        <div className={boardcss.description}>
          <h1 className={boardcss.header}>Result Munch Official</h1>
          <p className={boardcss.paragraph}>
            Get Online Job Form(Gov + Private), Results, Admit Card, Answer Key,
            Syllabus, Career News, Sarkari Yojana, Scholarship, Sarkari Notice
            etc.
          </p>
        </div>
      </div>
      <div className={boardcss.liveBilnksec}>
        <RedBlinkLive />
      </div>
      <div className={boardcss.jobSwitchsec}>
        <div className={boardcss.container}>
          <div
            className={`${boardcss.slider} ${
              active === "private" ? boardcss.moveRight : ""
            }`}
          ></div>

          <button
            className={`${boardcss.btn} ${
              active === "government" ? boardcss.active : ""
            }`}
            onClick={() => setActive("government")}
          >
            Government
          </button>

          <button
            className={`${boardcss.btn} ${
              active === "private" ? boardcss.active : ""
            }`}
            onClick={() => setActive("private")}
          >
            Private
          </button>
        </div>
      </div>
      <div className={boardcss.importantjoblistsec}>
        <div className={boardcss.importantcontainer}>
          <BoardCardSlider title="Today's Last Day Form" direction="left" />
          <BoardCardSlider title="Today's Vacancy" direction="right" />
        </div>
      </div>
    </div>
  );
};

export default Board;
