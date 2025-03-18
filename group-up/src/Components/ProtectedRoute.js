import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({children, ...rest}) => {
    const isLoggedIn = useSelector(state => state.user.value);
    console.log(isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isLoggedIn);
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    // If not logged in, it will redirect to /login, else render the children
    if (!isLoggedIn) {
        return null;  // Or you can return a loader if you want
    }

    return <>{children}</>;
};