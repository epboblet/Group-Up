import { Route, useNavigate } from "react-router-dom";
import { useLogin } from '../Context/LoginContext';
import { useEffect } from "react";

export const ProtectedRoute = ({children, ...rest}) => {
    const {isLoggedIn} = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    // If not logged in, it will redirect to /login, else render the children
    if (!isLoggedIn) {
        return null;  // Or you can return a loader if you want
    }

    return {children};
};