import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import jmcss from "./jobsmanager.module.css";
import AddJob from "../../page/addJob/AddJob";
import {
  getMyJobs,
  deleteJob,
  publishJob,
  hideJob,
} from "../../services/jobService";

const JobsManager = () => {
  const [view, setView] = useState("list"); // "list" | "add" | "edit"
  const [editingJob, setEditingJob] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const fetchJobs = useCallback(() => {
    setLoading(true);
    setError("");
    getMyJobs()
      .then((res) => setJobs(Array.isArray(res?.data) ? res.data : []))
      .catch((err) => setError(err?.message || "Failed to load jobs"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const backToList = () => {
    setEditingJob(null);
    setView("list");
  };

  const handleFormSuccess = () => {
    backToList();
    fetchJobs();
  };

  const onEdit = (job) => {
    setEditingJob(job);
    setView("edit");
  };

  const onTogglePublish = async (job) => {
    setBusyId(job._id);
    try {
      const res = job.isPublished
        ? await hideJob(job._id)
        : await publishJob(job._id);
      if (res?.success !== false) {
        toast.success(
          job.isPublished ? "Job hidden from web" : "Job published",
        );
        fetchJobs();
      } else {
        toast.error(res?.message || "Action failed");
      }
    } catch (err) {
      toast.error(err?.message || "Action failed");
    } finally {
      setBusyId(null);
    }
  };

  const onDelete = async (job) => {
    if (!window.confirm(`Delete "${job.title || job.label}" permanently?`))
      return;
    setBusyId(job._id);
    try {
      const res = await deleteJob(job._id);
      if (res?.success !== false) {
        toast.success("Job deleted");
        fetchJobs();
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } catch (err) {
      toast.error(err?.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  if (view === "add") {
    return (
      <AddJob
        mode="add"
        onSuccess={handleFormSuccess}
        onCancel={backToList}
      />
    );
  }

  if (view === "edit" && editingJob) {
    return (
      <AddJob
        key={editingJob._id}
        mode="edit"
        jobId={editingJob._id}
        initialData={editingJob}
        onSuccess={handleFormSuccess}
        onCancel={backToList}
      />
    );
  }

  return (
    <div className={jmcss.wrap}>
      <div className={jmcss.headerRow}>
        <h2 className={jmcss.title}>Jobs</h2>
        <button className={jmcss.addBtn} onClick={() => setView("add")}>
          + Add Job
        </button>
      </div>

      {loading && <p className={jmcss.muted}>Loading...</p>}
      {!loading && error && <p className={jmcss.errorText}>{error}</p>}
      {!loading && !error && jobs.length === 0 && (
        <p className={jmcss.muted}>No jobs yet. Click “Add Job” to create one.</p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className={jmcss.tableScroll}>
          <table className={jmcss.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div className={jmcss.jobTitle}>
                      {job.title || job.label || "Untitled"}
                    </div>
                    {job.boardName && (
                      <div className={jmcss.jobSub}>{job.boardName}</div>
                    )}
                  </td>
                  <td>
                    <span
                      className={`${jmcss.badge} ${
                        job.isPublished ? jmcss.badgeLive : jmcss.badgeDraft
                      }`}
                    >
                      {job.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className={jmcss.actions}>
                      {job.isPublished && (
                        <Link
                          to={`/${job._id}`}
                          target="_blank"
                          className={`${jmcss.btn} ${jmcss.btnGhost}`}
                        >
                          View
                        </Link>
                      )}
                      <button
                        className={`${jmcss.btn} ${jmcss.btnGhost}`}
                        onClick={() => onEdit(job)}
                        disabled={busyId === job._id}
                      >
                        Edit
                      </button>
                      <button
                        className={`${jmcss.btn} ${
                          job.isPublished ? jmcss.btnWarn : jmcss.btnPublish
                        }`}
                        onClick={() => onTogglePublish(job)}
                        disabled={busyId === job._id}
                      >
                        {job.isPublished ? "Hide" : "Publish"}
                      </button>
                      <button
                        className={`${jmcss.btn} ${jmcss.btnDanger}`}
                        onClick={() => onDelete(job)}
                        disabled={busyId === job._id}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsManager;
