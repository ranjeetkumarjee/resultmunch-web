import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const Home = lazy(() => import("../page/Home/Home.jsx"));
const UniqueJob = lazy(() => import("../page/UniqueJob/UniqueJob.jsx"));
const AddJob = lazy(() => import("../page/addJob/AddJob.jsx"));
const Login = lazy(() => import("../page/Login/Login.jsx"));
const AdminDashboard = lazy(() => import("../page/Admin/AdminDashboard.jsx"));
const EmployeeDashboard = lazy(
  () => import("../page/Dashboard/EmployeeDashboard.jsx"),
);

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Protected — admin only */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Protected — employee or admin */}
          <Route element={<ProtectedRoute role="employee" />}>
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route path="/add-job" element={<AddJob />} />
          </Route>

          {/* Public site (with navbar/footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:jobId" element={<UniqueJob />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
