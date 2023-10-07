import { Outlet } from "react-router-dom";
import TopNav from "../TopNavigation/top-nav";


const Layout: React.FC = () => {
  return (
    <>
        <TopNav/>
        <Outlet />
    </>
  );
}

export default Layout;