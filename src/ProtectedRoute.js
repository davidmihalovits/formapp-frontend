import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
