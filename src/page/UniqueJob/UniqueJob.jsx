import { useState } from "react";
import uniquejobcss from "./uniquejob.module.css";
import { Link } from "react-router-dom";

const UniqueJob = () => {
  const [jobData, setJobData] = useState(null);

  return (
    <div className={uniquejobcss.uniquejobcontainer}>
      <div className={uniquejobcss.jobheader}>
        <h1 className={uniquejobcss.jobtitle}>RRB Group-D Recruitment 2026</h1>
      </div>
      <div className={uniquejobcss.postdatesec}>
        Post Date: March 3, 2026 9:44 am
      </div>
      <div className={uniquejobcss.jobcontent}>
        <span className={uniquejobcss.jobtitleindes}>
          Bihar Public Service Commission (BPSC)
        </span>{" "}
        , The notification for the recruitment of{" "}
        <span className={uniquejobcss.bold}>
          {" "}
          Assistant Prosecution Officer (APO){" "}
        </span>
        Recruitment has released on the official website. This recruitment is
        for <span className={uniquejobcss.bold}>300 positions</span> . The BPSC
        application form has{" "}
        <span className={uniquejobcss.bold}> started on 27 February 2026</span>,
        and candidates can apply{" "}
        <span className={uniquejobcss.bold}> until 20 March 2026</span>. The
        <span className={uniquejobcss.bold}>minimum age is 21 Years</span> & the{" "}
        <span className={uniquejobcss.bold}>
          maximum age is 42 years as of 01 August 2026
        </span>
        . Candidates must check the complete details for the Bihar BPSC APO
        Recruitment 2026. provided below.{" "}
        <span className={uniquejobcss.bold}>(Advt. No. 13/2026)</span>
      </div>
      <div className={uniquejobcss.jobDesTableSec}>
        <table border={1} className={uniquejobcss.jobDesTable}>
          <tbody>
            <tr>
              <td colSpan={4} className={uniquejobcss.jobDesTableHeader}>
                Railway RRB Group D Online Form 2026 (22,195 Posts)
              </td>
            </tr>

            <tr>
              <td className={uniquejobcss.jobDesImportantDates}>
                Important Dates
              </td>
              <td className={uniquejobcss.jobDesApplicationFee}>
                Application Fee
              </td>
            </tr>

            <tr>
              <td style={{ width: "50%" }}>
                <ul className={uniquejobcss.jobDesImportantDatesList}>
                  <li>
                    Start Date:{" "}
                    <span className={uniquejobcss.bold}>27 February 2026</span>
                  </li>
                  <li>
                    Last Date:{" "}
                    <span className={`${uniquejobcss.redbold}  `}>
                      20 March 2026
                    </span>
                  </li>
                  <li>
                    Last Date for Fee Payment:{" "}
                    <span className={uniquejobcss.bold}>20 March 2026</span>
                  </li>
                </ul>
              </td>

              <td style={{ width: "50%" }}>
                <ul className={uniquejobcss.jobDesApplicationFeeList}>
                  <li>
                    General/OBC/EWS:{" "}
                    <span className={uniquejobcss.bold}>₹500</span>
                  </li>
                  <li>
                    SC/ST/PwBD: <span className={uniquejobcss.bold}>₹250</span>
                  </li>
                  <li>
                    Female Candidates:{" "}
                    <span className={uniquejobcss.bold}>₹250</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className={uniquejobcss.jobDesAgeLimitsHeading}>
                MPESB Van Rakshak / Jail Prahari Notification 2026 : Age Limits
                As On 01 January 2026
              </td>
              <td className={uniquejobcss.jobcoutingHeading}>Total Post</td>
            </tr>
            <tr>
              <td>
                <ul className={uniquejobcss.agelimitlisting}>
                  <li>
                    Minimum Age:{" "}
                    <span className={uniquejobcss.bold}>18 Years</span>
                  </li>
                  <li>
                    Maximum Age:{" "}
                    <span className={uniquejobcss.bold}>30 Years</span>
                  </li>
                </ul>
              </td>
              <td className={uniquejobcss.noofjobs}>1679 Posts</td>
            </tr>
          </tbody>
        </table>

        <table border={1} className={uniquejobcss.jobDesTable}>
          <tbody className={uniquejobcss.jobDesTable}>
            <tr>
              <td
                colSpan={2}
                className={`${uniquejobcss.jobDesTableHeader} ${uniquejobcss.jobDesPostwise}`}
              >
                MPESB Van Rakshak / Jail Prahari Online Form 2026 : Vacancy
                Details
              </td>
            </tr>
            <tr style={{ height: 35 }}>
              <th style={{ width: "50%" }}>Post Name</th>
              <th style={{ width: "50%" }}>No. Of Vacancies</th>
            </tr>

            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <tr style={{ height: 35 }} key={index}>
                  <td style={{ width: "50%", textAlign: "center" }}>
                    Van Rakshak
                  </td>
                  <td style={{ width: "50%", textAlign: "center" }}>1500</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table border={1} className={uniquejobcss.jobDesTable}>
          <tbody className={uniquejobcss.jobDesTable}>
            <tr>
              <td colSpan={2} className={uniquejobcss.jobDesTableHeader}>
                MPESB Van Rakshak / Jail Prahari Online Form 2026 : Educational
                Qualification
              </td>
            </tr>
            <tr style={{ height: 35 }}>
              <th style={{ width: "50%" }}>Post Name</th>
              <th style={{ width: "50%" }}>Educational Qualification</th>
            </tr>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <tr style={{ height: 35 }} key={index}>
                  <td style={{ width: "50%", textAlign: "center" }}>
                    Van Rakshak
                  </td>
                  <td style={{ width: "50%", textAlign: "center" }}>
                    10th Pass
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table border={1} className={uniquejobcss.jobDesTable}>
          <tbody className={uniquejobcss.jobDesTable}>
            <tr style={{ background: "#ffff0029", height: 45 }}>
              <td
                style={{
                  width: "50%",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Official Notification
              </td>
              <td
                style={{
                  width: "50%",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                <Link
                  className=""
                  style={{ textDecoration: "none" }}
                  to="/official-notification"
                >
                  Click Here
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniqueJob;
