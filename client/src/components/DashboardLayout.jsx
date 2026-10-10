import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import LogoutConfirmationDialog from "./LogoutConfirmationDialog";

function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [logoutPending, setLogoutPending] = useState(false);
    const [logoutError, setLogoutError] = useState("");
    const logoutTriggerRef = useRef(null);
    let token = null;
    try {
        token = localStorage.getItem("token");
    } catch {
        token = null;
    }
    if (!token) return <Navigate to="/login" replace state={{ from: location }}/>;

    const requestLogout = (event) => {
        logoutTriggerRef.current = event.currentTarget;
        setLogoutError("");
        setLogoutOpen(true);
    };

    const confirmLogout = () => {
        if (logoutPending) return;
        setLogoutPending(true);
        setLogoutError("");
        try {
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            // Remove the session token last, so a storage error above does not sign out early.
            localStorage.removeItem("token");
            setLogoutOpen(false);
            navigate("/login", { replace: true });
        } catch {
            setLogoutError("We couldn't log you out. Please try again.");
            setLogoutPending(false);
        }
    };

    return (
        <>
        <div className="app-layout" inert={logoutOpen}>

            <Sidebar onRequestLogout={requestLogout} />

            <div className="main-area">

                <Topbar onRequestLogout={requestLogout} logoutDialogOpen={logoutOpen} />

                <main className="page-content">
                    <Outlet />
                </main>

            </div>

        </div>
        {logoutOpen && <LogoutConfirmationDialog
            pending={logoutPending}
            error={logoutError}
            triggerRef={logoutTriggerRef}
            onCancel={() => { if (!logoutPending) setLogoutOpen(false); }}
            onConfirm={confirmLogout}
        />}
        </>
    );
}

export default DashboardLayout;
