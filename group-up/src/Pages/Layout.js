import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import "../App.css"

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
};

export default Layout;