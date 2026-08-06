import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import uniquejobcss from "./uniquejob.module.css";
import { getJobById } from "../../services/jobService";

const UniqueJob = () => {
  const { jobId } = useParams();

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobId) return;
    let active = true;
    setLoading(true);
    setError("");

    getJobById(jobId)
      .then((res) => {
        if (!active) return;
        // API returns { success, message, data }; fall back to the raw body.
        setJobData(res?.data || res || null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err?.message || "Failed to load job");
        setJobData(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [jobId]);

  if (loading) {
    return (
      <div className={uniquejobcss.uniquejobcontainer}>
        <p style={{ padding: "20px", fontSize: 20 }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={uniquejobcss.uniquejobcontainer}>
        <p style={{ padding: "20px", fontSize: 20, color: "#dc3545" }}>
          {error}
        </p>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className={uniquejobcss.uniquejobcontainer}>
        <p style={{ padding: "20px", fontSize: 20 }}>Job not found.</p>
      </div>
    );
  }

  const {
    title,
    label,
    postDate,
    boardName,
    postName,
    noOfVacancies,
    minAgeLimit,
    maxAgeLimit,
    ageRefDate,
    advertisementNo,
    importantDates = [],
    applicationFees = [],
    ageLimits = [],
    postsWithNoVaccancy = [],
    postsWithElligibility = [],
    headingLinks = [],
  } = jobData;

  const dates = importantDates.filter((d) => d.label || d.date);
  const fees = applicationFees.filter((f) => f.label || f.fee);
  const ages = ageLimits.filter((a) => a.label || a.value);
  const vacancies = postsWithNoVaccancy.filter(
    (p) => p.PostLevel || p.noVaccancy,
  );
  const eligibility = postsWithElligibility.filter(
    (p) => p.PostLevel || p.elligibility,
  );
  const links = headingLinks.filter((l) => l.Level || l.Link);

  return (
    <div className={uniquejobcss.uniquejobcontainer}>
      <div className={uniquejobcss.jobDesSec}>
        <div className={uniquejobcss.jobheader}>
          <h1 className={uniquejobcss.jobtitle}>{title || label}</h1>
        </div>
        {postDate && (
          <div className={uniquejobcss.postdatesec}>Post Date: {postDate}</div>
        )}
        <div className={uniquejobcss.jobcontent}>
          {boardName && (
            <span className={uniquejobcss.jobtitleindes}>{boardName}</span>
          )}{" "}
          {postName}
          {advertisementNo && (
            <>
              {" "}
              <span className={uniquejobcss.bold}>
                (Advt. No. {advertisementNo})
              </span>
            </>
          )}
        </div>
      </div>

      <div className={uniquejobcss.jobDesTableSec}>
        <table border={1} className={uniquejobcss.jobDesTable}>
          <tbody>
            <tr>
              <td colSpan={4} className={uniquejobcss.jobDesTableHeader}>
                {title || label}
                {noOfVacancies ? ` (${noOfVacancies} Posts)` : ""}
              </td>
            </tr>

            {(dates.length > 0 || fees.length > 0) && (
              <>
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
                      {dates.map((d, i) => (
                        <li key={i}>
                          {d.label}:{" "}
                          <span
                            className={uniquejobcss.bold}
                            style={d.textColor ? { color: d.textColor } : undefined}
                          >
                            {d.date}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td style={{ width: "50%" }}>
                    <ul className={uniquejobcss.jobDesApplicationFeeList}>
                      {fees.map((f, i) => (
                        <li key={i}>
                          {f.label}:{" "}
                          <span className={uniquejobcss.bold}>{f.fee}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </>
            )}

            {(ages.length > 0 || noOfVacancies) && (
              <>
                <tr>
                  <td className={uniquejobcss.jobDesAgeLimitsHeading}>
                    Age Limits{ageRefDate ? ` As On ${ageRefDate}` : ""}
                  </td>
                  <td className={uniquejobcss.jobcoutingHeading}>Total Post</td>
                </tr>
                <tr>
                  <td>
                    <ul className={uniquejobcss.agelimitlisting}>
                      {ages.length > 0
                        ? ages.map((a, i) => (
                            <li key={i}>
                              {a.label}:{" "}
                              <span className={uniquejobcss.bold}>{a.value}</span>
                            </li>
                          ))
                        : (minAgeLimit || maxAgeLimit) && (
                            <>
                              <li>
                                Minimum Age:{" "}
                                <span className={uniquejobcss.bold}>
                                  {minAgeLimit} Years
                                </span>
                              </li>
                              <li>
                                Maximum Age:{" "}
                                <span className={uniquejobcss.bold}>
                                  {maxAgeLimit} Years
                                </span>
                              </li>
                            </>
                          )}
                    </ul>
                  </td>
                  <td className={uniquejobcss.noofjobs}>
                    {noOfVacancies ? `${noOfVacancies} Posts` : "—"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {vacancies.length > 0 && (
          <table border={1} className={uniquejobcss.jobDesTable}>
            <tbody className={uniquejobcss.jobDesTable}>
              <tr>
                <td
                  colSpan={2}
                  className={`${uniquejobcss.jobDesTableHeader} ${uniquejobcss.jobDesPostwise}`}
                >
                  {title || label} : Vacancy Details
                </td>
              </tr>
              <tr style={{ height: 35 }}>
                <th style={{ width: "50%" }}>Post Name</th>
                <th style={{ width: "50%" }}>No. Of Vacancies</th>
              </tr>

              {vacancies.map((p, index) => (
                <tr style={{ height: 35 }} key={index}>
                  <td style={{ width: "50%", textAlign: "center" }}>
                    {p.PostLevel}
                  </td>
                  <td style={{ width: "50%", textAlign: "center" }}>
                    {p.noVaccancy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {eligibility.length > 0 && (
          <table border={1} className={uniquejobcss.jobDesTable}>
            <tbody className={uniquejobcss.jobDesTable}>
              <tr>
                <td colSpan={2} className={uniquejobcss.jobDesTableHeader}>
                  {title || label} : Educational Qualification
                </td>
              </tr>
              <tr style={{ height: 35 }}>
                <th style={{ width: "50%" }}>Post Name</th>
                <th style={{ width: "50%" }}>Educational Qualification</th>
              </tr>
              {eligibility.map((p, index) => (
                <tr style={{ height: 35 }} key={index}>
                  <td style={{ width: "50%", textAlign: "center" }}>
                    {p.PostLevel}
                  </td>
                  <td style={{ width: "50%", textAlign: "center" }}>
                    {p.elligibility}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {links.length > 0 && (
          <table border={1} className={uniquejobcss.jobDesTable}>
            <tbody className={uniquejobcss.jobDesTable}>
              {links.map((l, index) => (
                <tr key={index} style={{ background: "#ffff0029", height: 45 }}>
                  <td
                    style={{
                      width: "50%",
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {l.Level}
                  </td>
                  <td
                    style={{
                      width: "50%",
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {l.Link ? (
                      <Link
                        style={{ textDecoration: "none" }}
                        to={l.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click Here
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UniqueJob;
