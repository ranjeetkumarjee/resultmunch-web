import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";

const Home = lazy(() => import("../page/Home/Home.jsx"));
const UniqueJob = lazy(() => import("../page/UniqueJob/UniqueJob.jsx"));
const AddJob = lazy(() => import("../page/addJob/AddJob.jsx"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:jobId" element={<UniqueJob />} />
            <Route path="/add-job" element={<AddJob />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
