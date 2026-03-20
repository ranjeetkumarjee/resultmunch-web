import ListView from "../../components/ListView/ListView";
import homecss from "./home.module.css";

const Home = () => {
  return (
    <div className={homecss.homesection}>
      <div className={homecss.jobrow}>
        <div className={homecss.resultlistsec}>
          <ListView header="Results" />
        </div>
        <div className={homecss.resultlistsec}>
          <ListView header="Admit Cards" />
        </div>
        <div className={homecss.resultlistsec}>
          <ListView header="Job Notifications" />
        </div>
      </div>
      <div className={homecss.secondrow}>
        <div className={homecss.resultlistsec}>
          <ListView header="Answer Key" />
        </div>
        <div className={homecss.resultlistsec}>
          <ListView header="Documents" />
        </div>
        <div className={homecss.resultlistsec}>
          <ListView header="Admission" />
        </div>
      </div>
    </div>
  );
};

export default Home;
