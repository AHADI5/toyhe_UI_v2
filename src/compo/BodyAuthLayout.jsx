
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

          <div className= {`flex-none ${context.isOpenNav === true && 'show sidebarOverlay'} `} onClick={ () => context.setIsOpenNav(false) }> </div>

          <div className={`sidebarWrapper ${context.isToggleSidebar === true ? 'toggle' : '' } ${context.isOpenNav == true ? 'open' : ''} ` }>
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
