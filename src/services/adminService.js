import HttpClient from "../utils/apiHelper";
import { endpoints } from "../config/endpoints.config";

// Add employee — server generates userId + password and returns them ONCE.
// Returns { success, data: { userId, password, name, _id } }
export const addEmployee = (payload) =>
  HttpClient.post(endpoints.employees(), payload);

// List employees — { success, data: [ ... ] }
export const getEmployees = (params) =>
  HttpClient.get(endpoints.employees(), params);

// Remove employee
export const deleteEmployee = (id) =>
  HttpClient.delete(endpoints.employeeById(id));
