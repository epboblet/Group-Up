import { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export default function LoginContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <LoginContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn
        }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = () => {
    return useContext(LoginContext);
}