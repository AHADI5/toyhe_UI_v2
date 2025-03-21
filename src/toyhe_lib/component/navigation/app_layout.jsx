import { Outlet } from "react-router";
import SideBarMenu from "./side_bar_menu";
import TopBar from "./top_bar";

const AppLayout = () => {
    return (
        <div>
            <TopBar/>
            <div className="side_bar_content flex">
                <Outlet className = "h-4 w-4 bg-gray-200 peer-checked:bg-blue-500"/>
                <div className = "h-4 w-4 bg-gray-200 peer-checked:bg-blue-500"><SideBarMenu /></div>
            </div>

        </div>
    );

    }

export default AppLayout;