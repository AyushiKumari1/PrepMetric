import { Navigate, Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
    const location = useLocation();
    let token = null;
    try {
        token = localStorage.getItem("token");
    } catch {
        token = null;
    }
    if (!token) return <Navigate to="/login" replace state={{ from: location }}/>;

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <Topbar />

                <main className="page-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;
