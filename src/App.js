import "./App.css";
import { ToastContainer } from "react-toastify";
import Router from "./routing/Router.js";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
