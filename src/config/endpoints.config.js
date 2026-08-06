const baseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/v1";

export const endpoints = {
  // ─── Auth ──────────────────────────────────────────────────────────────
  login: () => `${baseUrl}/auth/login`,

  // ─── Admin: employees ──────────────────────────────────────────────────
  employees: () => `${baseUrl}/admin/employees`,
  employeeById: (id) => `${baseUrl}/admin/employees/${id}`,

  // ─── Jobs (protected: admin or employee) ───────────────────────────────
  createJob: () => `${baseUrl}/jobs`,
  updateJob: (id) => `${baseUrl}/jobs/${id}`,
  deleteJob: (id) => `${baseUrl}/jobs/${id}`,
  publishJob: (id) => `${baseUrl}/jobs/${id}/publish`,
  hideJob: (id) => `${baseUrl}/jobs/${id}/hide`,
  myJobs: () => `${baseUrl}/jobs/mine`,

  // ─── Public (no auth) ──────────────────────────────────────────────────
  getAllJobs: () => `${baseUrl}/get-all-jobs`,
  getJobById: (id) => `${baseUrl}/get-job/${id}`,
  getAdmitCard: () => `${baseUrl}/get-admit-card`,
  getResults: () => `${baseUrl}/get-results`,
  getDocuments: () => `${baseUrl}/get-documents`,
  getAnswerKeys: () => `${baseUrl}/get-answer-keys`,
  getAdmissions: () => `${baseUrl}/get-admissions`,
};
