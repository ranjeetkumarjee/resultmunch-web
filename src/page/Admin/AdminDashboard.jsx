import { useState } from "react";
import admincss from "./admin.module.css";
import DashboardShell from "../../components/DashboardShell/DashboardShell";
import EmployeesManager from "../../components/EmployeesManager/EmployeesManager";
import JobsManager from "../../components/JobsManager/JobsManager";

const TABS = [
  { key: "jobs", label: "Jobs" },
  { key: "employees", label: "Employees" },
];

const AdminDashboard = () => {
  const [tab, setTab] = useState("jobs");

  return (
    <DashboardShell>
      <div className={admincss.tabBar}>
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`${admincss.tab} ${tab === t.key ? admincss.tabActive : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={admincss.panel}>
        {tab === "jobs" && <JobsManager />}
        {tab === "employees" && <EmployeesManager />}
      </div>
    </DashboardShell>
  );
};

export default AdminDashboard;
