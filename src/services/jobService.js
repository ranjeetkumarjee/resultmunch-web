import HttpClient from "../utils/apiHelper";
import { endpoints } from "../config/endpoints.config";

export const createJob = (payload) =>
  HttpClient.post(endpoints.createJob(), payload);

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
