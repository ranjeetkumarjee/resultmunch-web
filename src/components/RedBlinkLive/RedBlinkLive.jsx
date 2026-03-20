import redblinkcss from "./redblink.module.css";

const RedBlinkLive = () => {
  return (
    <div className={redblinkcss.liveBox}>
      <span className={redblinkcss.dot}></span>
      <span className={redblinkcss.text}>Live</span>
    </div>
  );
};

export default RedBlinkLive;
