const baseUrl = "http://localhost:5000/api/v1";

export const endpoints = {
  getAllJobs: () => `${baseUrl}/jobs`,
  getJobById: (id) => `${baseUrl}/jobs/${id}`,
  addJob: () => `${baseUrl}/create-job`,
};
