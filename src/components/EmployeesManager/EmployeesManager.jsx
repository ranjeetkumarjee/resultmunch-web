import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import emcss from "./employeesmanager.module.css";
import {
  addEmployee,
  getEmployees,
  deleteEmployee,
} from "../../services/adminService";

const EmployeesManager = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState(null);

  // Credentials returned once after creating an employee.
  const [newCreds, setNewCreds] = useState(null);

  const fetchEmployees = useCallback(() => {
    setLoading(true);
    setError("");
    getEmployees()
      .then((res) => setEmployees(Array.isArray(res?.data) ? res.data : []))
      .catch((err) => setError(err?.message || "Failed to load employees"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const onAdd = async (e) => {
    e.preventDefault();
    if (adding) return;
    if (!name.trim()) {
      toast.error("Enter employee name");
      return;
    }
    try {
      setAdding(true);
      const res = await addEmployee({ name: name.trim() });
      if (res?.data?.userId) {
        setNewCreds(res.data); // { userId, password, name }
        setName("");
        toast.success("Employee added");
        fetchEmployees();
      } else {
        toast.error(res?.message || "Failed to add employee");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to add employee");
    } finally {
      setAdding(false);
    }
  };

  const onDelete = async (emp) => {
    if (!window.confirm(`Remove employee "${emp.name}"?`)) return;
    setBusyId(emp._id);
    try {
      const res = await deleteEmployee(emp._id);
      if (res?.success !== false) {
        toast.success("Employee removed");
        fetchEmployees();
      } else {
        toast.error(res?.message || "Failed to remove");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to remove");
    } finally {
      setBusyId(null);
    }
  };

  const copyCreds = () => {
    if (!newCreds) return;
    const text = `User ID: ${newCreds.userId}\nPassword: ${newCreds.password}`;
    navigator.clipboard?.writeText(text).then(
      () => toast.success("Credentials copied"),
      () => toast.error("Copy failed"),
    );
  };

  return (
    <div className={emcss.wrap}>
      <div className={emcss.headerRow}>
        <h2 className={emcss.title}>Employees</h2>
      </div>

      <form className={emcss.addForm} onSubmit={onAdd}>
        <input
          className={emcss.input}
          placeholder="Employee full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className={emcss.addBtn} type="submit" disabled={adding}>
          {adding ? "Adding..." : "+ Add Employee"}
        </button>
      </form>

      {newCreds && (
        <div className={emcss.credsCard}>
          <div className={emcss.credsHead}>
            <strong>Credentials generated — copy them now</strong>
            <button
              className={emcss.closeBtn}
              onClick={() => setNewCreds(null)}
              title="Dismiss"
            >
              ✕
            </button>
          </div>
          <p className={emcss.credsWarn}>
            These are shown only once. Share them with {newCreds.name}.
          </p>
          <div className={emcss.credsRow}>
            <span>User ID</span>
            <code>{newCreds.userId}</code>
          </div>
          <div className={emcss.credsRow}>
            <span>Password</span>
            <code>{newCreds.password}</code>
          </div>
          <button className={emcss.copyBtn} onClick={copyCreds}>
            Copy credentials
          </button>
        </div>
      )}

      {loading && <p className={emcss.muted}>Loading...</p>}
      {!loading && error && <p className={emcss.errorText}>{error}</p>}
      {!loading && !error && employees.length === 0 && (
        <p className={emcss.muted}>No employees yet.</p>
      )}

      {!loading && !error && employees.length > 0 && (
        <div className={emcss.tableScroll}>
          <table className={emcss.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>User ID</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>
                    <code>{emp.userId}</code>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className={emcss.deleteBtn}
                      onClick={() => onDelete(emp)}
                      disabled={busyId === emp._id}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeesManager;
