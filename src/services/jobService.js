import HttpClient from "../utils/apiHelper";
import { endpoints } from "../config/endpoints.config";

// ─── Protected: create / update / publish / hide / delete ────────────────────

export const createJob = (payload) =>
  HttpClient.post(endpoints.createJob(), payload);

export const updateJob = (id, payload) =>
  HttpClient.put(endpoints.updateJob(id), payload);

export const deleteJob = (id) => HttpClient.delete(endpoints.deleteJob(id));

export const publishJob = (id) => HttpClient.patch(endpoints.publishJob(id));

export const hideJob = (id) => HttpClient.patch(endpoints.hideJob(id));

export const getMyJobs = (params) => HttpClient.get(endpoints.myJobs(), params);

// ─── Public listings ─────────────────────────────────────────────────────────

export const getAllJobs = (params) =>
  HttpClient.get(endpoints.getAllJobs(), params);

export const getAdmitCards = (params) =>
  HttpClient.get(endpoints.getAdmitCard(), params);

export const getResults = (params) =>
  HttpClient.get(endpoints.getResults(), params);

export const getDocuments = (params) =>
  HttpClient.get(endpoints.getDocuments(), params);

export const getAnswerKeys = (params) =>
  HttpClient.get(endpoints.getAnswerKeys(), params);

export const getAdmissions = (params) =>
  HttpClient.get(endpoints.getAdmissions(), params);

export const getJobById = (id) => HttpClient.get(endpoints.getJobById(id));
