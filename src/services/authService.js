import HttpClient from "../utils/apiHelper";
import { endpoints } from "../config/endpoints.config";

// Login for admin or employee (same endpoint).
// Returns { success, data: { token, role, userId } }
export const login = (payload) => HttpClient.post(endpoints.login(), payload);
