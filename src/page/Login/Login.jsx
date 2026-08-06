import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import logincss from "./login.module.css";
import { login as loginApi } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSession } = useAuth();

  // Cosmetic hint only — the server determines the real role from credentials.
  const [mode, setMode] = useState("admin");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!userId.trim() || !password) {
      toast.error("Enter User ID and Password");
      return;
    }
    try {
      setLoading(true);
      const res = await loginApi({ userId: userId.trim(), password });
      const session = res?.data;
      if (session?.token) {
        setSession({
          token: session.token,
          role: session.role,
          userId: session.userId,
        });
        toast.success("Logged in successfully");
        const dest =
          location.state?.from ||
          (session.role === "admin" ? "/admin" : "/dashboard");
        navigate(dest, { replace: true });
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={logincss.loginRoot}>
      <form className={logincss.loginCard} onSubmit={submit}>
        <h1 className={logincss.loginTitle}>Result Munch</h1>
        <p className={logincss.loginSub}>Sign in to your dashboard</p>

        <div className={logincss.toggleRow}>
          <button
            type="button"
            className={`${logincss.toggleBtn} ${mode === "admin" ? logincss.toggleActive : ""}`}
            onClick={() => setMode("admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className={`${logincss.toggleBtn} ${mode === "employee" ? logincss.toggleActive : ""}`}
            onClick={() => setMode("employee")}
          >
            Employee
          </button>
        </div>

        <label className={logincss.label}>User ID</label>
        <input
          className={logincss.input}
          placeholder={mode === "admin" ? "admin" : "Employee user ID"}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          autoComplete="username"
        />

        <label className={logincss.label}>Password</label>
        <input
          className={logincss.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          className={logincss.submitBtn}
          type="submit"
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
