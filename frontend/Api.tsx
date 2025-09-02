import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8001/api/v1", // Updated to match your backend
});

// Types for your backend
interface RegisterData {
  email: string;
  name: string;        // Required field your backend expects
  password: string;
  role?: string;       // Optional, defaults to "STUDENT"
}

interface LoginData {
  email: string;
  password: string;
}

// Register user - updated to match your backend
export const registerUser = (userData: RegisterData) =>
  API.post("/auth/register", userData); // JSON body, not params

// Login user - updated to match your backend  
export const loginUser = (userData: LoginData) =>
  API.post("/auth/login", userData); // JSON body, not params

// Get current user
export const getCurrentUser = () =>
  API.get("/users/me");