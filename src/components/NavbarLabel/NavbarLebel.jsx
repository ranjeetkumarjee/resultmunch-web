import navbarlebelcss from "./navbarlabel.module.css";
const NavbarLebel = () => {
  const label = ["Home", "Jobs", "Company", "Contact"];
  return (
    <div className={navbarlebelcss.navbarlebelsec}>
      {label.map((item) => (
        <span className={navbarlebelcss.navbarlabel} key={item}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default NavbarLebel;
