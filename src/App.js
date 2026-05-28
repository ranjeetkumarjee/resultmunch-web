import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import Router from "./routing/Router.js";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router />
    </div>
  );
}

export default App;
