import { createContext, useState } from "react"

import { getCookieUserData } from "../util/getCookieUserData"
import { loginService, registerService } from "../services/authService";

export const AuthContext = createContext();;

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(getCookieUserData());

    function setUser() {
        setAuth(getCookieUserData());
    }

    async function register(userData) {
        await registerService(userData);
        setUser()
    }

    async function login(userData) {
        await loginService(userData);
        setUser()
    }

    function logout() {
        setUser()
    }

    const values = {
        auth,
        register,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={values} >
            {children}
        </AuthContext.Provider>
    )
}