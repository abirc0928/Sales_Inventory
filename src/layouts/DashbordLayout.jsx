import { Navigate, Outlet } from "react-router";
import Navbar from "../partials/Navbar";
import SideBar from "../partials/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
    const token = localStorage.getItem("token");
 if (!token) return <Navigate to={"/login/"} />;
   

    const [isNavOpen, setIsNavOpen] = useState(true);

    const handleNavOpen = () => {
        console.log(isNavOpen)
        setIsNavOpen(!isNavOpen);
    }

    return (
        <>
            <Navbar navOpenHandler={handleNavOpen} />
            <div id="sideNavRef" className={isNavOpen ? "side-nav-open" : "side-nav-close"}>
                <SideBar />
            </div>
            <div id="contentRef" className={isNavOpen ? "content" : "content-expand"}>
                <Outlet />
            </div>
        </>
    );
};

export default DashboardLayout;