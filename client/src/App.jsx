import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import { useAuthContext } from "hooks/useAuthContext";

import Nav from "components/Nav";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";

import SalesmanDashboard from "pages/salesman/Dashboard";
import CreateReport from "pages/salesman/CreateReport";

import AdminDashboard from "pages/admin/Dashboard";

export default function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  axios.defaults.baseURL = VITE_SERVER_URL;
  axios.defaults.withCredentials = true;

  console.log('VITE URL', VITE_SERVER_URL)
  const { user, admin } = useAuthContext();

  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Nav user={user} admin={admin} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/salesman/:salesmanId"
            element={user ? <SalesmanDashboard user={user} /> : <Navigate to="/"/> }
          />
          <Route
            path="salesman/:salesmanId/report/:reportId"
            element={user ? <CreateReport /> : <Navigate to="/"/>}
          />
          <Route
            path="/admin"
            element={admin ? <AdminDashboard user={user} /> : <Navigate to="/"/>}
          />
          <Route path="/error404" element={<div className="text-center">Error 404</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
