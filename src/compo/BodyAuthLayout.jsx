
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { MyContext } from "../App";

const BodyAuthLayout = (props) => {
  const context = useContext(MyContext);
  return (
    <div>
      <Header />
      <main className="flex mainAuth">
        <div className={`sidebarWrapper ${context.isToggleSidebar === true ? 'toggle' : ''}` }>
            <Sidebar />
        </div>
        
        <div className={`contentDroite ${context.isToggleSidebar === true ? 'toggle' : ''} `}>
            <Outlet />
        </div>
      </main>
    </div>
  );
}

export default BodyAuthLayout;
