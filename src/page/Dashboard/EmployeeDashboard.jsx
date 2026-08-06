import dashcss from "./dashboard.module.css";
import DashboardShell from "../../components/DashboardShell/DashboardShell";
import JobsManager from "../../components/JobsManager/JobsManager";

const EmployeeDashboard = () => {
  return (
    <DashboardShell>
      <div className={dashcss.panel}>
        <JobsManager />
      </div>
    </DashboardShell>
  );
};

export default EmployeeDashboard;
