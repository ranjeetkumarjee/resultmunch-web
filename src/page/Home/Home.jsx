import ListView from "../../components/ListView/ListView";
import homecss from "./home.module.css";
import {
  getResults,
  getAdmitCards,
  getAllJobs,
  getAnswerKeys,
  getDocuments,
  getAdmissions,
} from "../../services/jobService";

const Home = () => {
  return (
    <div className={homecss.homesection}>
      <div className={homecss.jobrow}>
        <div className={homecss.resultlistsec}>
          <ListView header="Results" fetcher={getResults} />
        </div>
        <div className={homecss.resultlistsec}>
          <ListView header="Admit Cards" fetcher={getAdmitCards} />
        </div>
        <div className={homecss.resultlistsec}>
          <ListView header="Job Notifications" fetcher={getAllJobs} />
        </div>
      </div>
      <div className={homecss.secondrow}>
        <div className={homecss.resultlistsec}>
          <ListView header="Answer Key" fetcher={getAnswerKeys} />
        </div>
        <div className={homecss.resultlistsec}>
          <ListView header="Documents" fetcher={getDocuments} />
        </div>
        <div className={homecss.resultlistsec}>
          <ListView header="Admission" fetcher={getAdmissions} />
        </div>
      </div>
    </div>
  );
};

export default Home;
