import logo from "../../assets/logo/companylogo.png";
import navbarcss from "./navbar.module.css";
import NavbarLebel from "../NavbarLabel/NavbarLebel.jsx";
import Board from "../Board/Board.jsx";

const Navbar = () => {
  return (
    <div className={navbarcss.navbarsec}>
      <div className={navbarcss.headersec}>
        <div className={navbarcss.logoiconsec}>
          {/* <img className={navbarcss.logo} src={logo} alt="logo" /> */}
        </div>
        <div className={navbarcss.webdescriptionSec}>
          <h1 className={navbarcss.companyHeader}>Result Munch</h1>
          <p className={navbarcss.companyLink}>https://resultmunch.com</p>
        </div>
      </div>
      <NavbarLebel />
      <Board />
    </div>
  );
};

export default Navbar;
