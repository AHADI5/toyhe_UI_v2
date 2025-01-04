
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const BodyAuthLayout = (props) => {
  return (
    <div>
      <Header />
      <main className="flex mainAuth">
        <div className="sidebarWrapper">
            <Sidebar />
        </div>
        
        <div className="contentDroite">
            <Outlet />
        </div>
      </main>
    </div>
  );
}

export default BodyAuthLayout;
