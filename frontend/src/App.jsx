import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Problems from "./pages/Problems";
import ProblemPage from "./pages/ProblemPage";
import Contests from "./pages/Contests";
import Discussion from "./pages/Discussion";
import Interview from "./pages/Interview";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContestLeaderboard from "./pages/ContestLeader";
import ContestProblems from "./pages/ContestProblem";
import ContestDiscussion from "./pages/ContestDiscussion";
import ContestLayout from "./layouts/ContestLayout";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminProblems from "./pages/admin/AdminProblems";
import CreateEditProblem from "./pages/admin/AdminCreateProblem";
import SetTestCases from "./pages/admin/SetTestCases";
import SetContests from "./pages/admin/SetContests";
import UserControl from "./pages/admin/UserControl";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperDashboard from "./pages/super_admin/SuperDashboard";
import AdminsControl from "./pages/super_admin/AdminsControl";
import AllProblems from "./pages/super_admin/AllProblems";
import AllTestCases from "./pages/super_admin/AllTestCases";
import AllUsers from "./pages/super_admin/AllUsers";
import AuditLogs from "./pages/super_admin/AuditLogs";
import PlatformActivity from "./pages/super_admin/PlatformActivity";
import PlatformSettings from "./pages/super_admin/PlatformSettings";

const App = () => {
  const location = useLocation();
  const noNavbarRoutes = [
    "/login",
    "/signup",
    "/problem/",
    "/contest/", // hide global navbar inside contest
  ];

  const hideNavbar = noNavbarRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problem/:problemid" element={<ProblemPage />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/discuss" element={<Discussion />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/*super_admin control*/}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<SuperDashboard />} />

          <Route path="users" element={<AllUsers />} />
          <Route path="admins" element={<AdminsControl />} />

          <Route path="platform/activity" element={<PlatformActivity />} />
          <Route path="platform/logs" element={<AuditLogs />} />

          <Route path="content/problems" element={<AllProblems />} />
          <Route path="content/testcases" element={<AllTestCases />} />

          <Route path="settings" element={<PlatformSettings />} />
        </Route>

        {/* admin control*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="problems" element={<AdminProblems />} />
          <Route path="problems/new" element={<CreateEditProblem />} />
          <Route path="problems/:id/edit" element={<CreateEditProblem />} />
          <Route path="problems/set/testcases" element={<SetTestCases />} />
          <Route path="control/contests" element={<SetContests />} />
          <Route path="control/user/access" element={<UserControl />} />
        </Route>

        {/* contest control */}

        <Route path="/contest/:contestId" element={<ContestLayout />}>
          <Route index element={<ContestProblems />} />
          <Route path="problems" element={<ContestProblems />} />
          <Route path="problems/:problemId" element={<ProblemPage />} />
          <Route path="leaderboard" element={<ContestLeaderboard />} />
          <Route path="discuss" element={<ContestDiscussion />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
