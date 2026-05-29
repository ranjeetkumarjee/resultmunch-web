const baseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/v1";

export const endpoints = {
  createJob: () => `${baseUrl}/create-job`,
  getAllJobs: () => `${baseUrl}/get-all-jobs`,
  getAdmitCard: () => `${baseUrl}/get-admit-card`,
  getResults: () => `${baseUrl}/get-results`,
  getDocuments: () => `${baseUrl}/get-documents`,
  getAnswerKeys: () => `${baseUrl}/get-answer-keys`,
  getAdmissions: () => `${baseUrl}/get-admissions`,
  getJobById: (id) => `${baseUrl}/jobs/${id}`,
};
