import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobDescription from "./pages/JobDescription";
import SkillGapAnalysis from "./pages/SkillGapAnalysis";
import MockInterviews from "./pages/MockInterviews";
import TechnicalQuestion from "./pages/TechnicalQuestion";
import BehavioralQuestion from "./pages/BehavioralQuestion";
import ProgressTracking from "./pages/ProgressTracking";
import Performance from "./pages/Performance";
import ReadinessReport from "./pages/ReadinessReport";
import PreparationPlan from "./pages/PreparationPlan";

import DashboardLayout from "./components/DashboardLayout";

import "./App.css";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Authentication pages */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/resume-analysis"
                        element={<ResumeAnalysis />}
                    />

                    <Route
                        path="/job-description"
                        element={<JobDescription />}
                    />

                    <Route
                        path="/skill-gap-analysis"
                        element={<SkillGapAnalysis />}
                    />

                    <Route
                        path="/mock-interviews"
                        element={<MockInterviews />}
                    />

                    <Route
                        path="/technical-question"
                        element={<TechnicalQuestion />}
                    />

                    <Route
                        path="/behavioral-question"
                        element={<BehavioralQuestion />}
                    />

                    <Route
                        path="/progress-tracking"
                        element={<ProgressTracking />}
                    />

                    <Route
                        path="/performance"
                        element={<Performance />}
                    />

                    <Route
                        path="/readiness-report"
                        element={<ReadinessReport />}
                    />

                    <Route
                        path="/preparation-plan"
                        element={<PreparationPlan />}
                    />

                </Route>


                {/* Default route */}
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;