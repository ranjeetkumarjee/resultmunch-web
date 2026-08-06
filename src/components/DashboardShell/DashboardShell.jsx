import { useNavigate } from "react-router-dom";
import dscss from "./dashboardshell.module.css";
import { useAuth } from "../../context/AuthContext";

const DashboardShell = ({ children }) => {
  const navigate = useNavigate();
  const { userId, role, logout } = useAuth();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={dscss.root}>
      <header className={dscss.topbar}>
        <div className={dscss.brand}>
          <span className={dscss.brandName}>Result Munch</span>
          <span className={dscss.roleTag}>{role}</span>
        </div>
        <div className={dscss.userBox}>
          <span className={dscss.userId}>{userId}</span>
          <button className={dscss.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className={dscss.content}>{children}</main>
    </div>
  );
};

export default DashboardShell;
