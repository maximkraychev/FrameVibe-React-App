import { createContext, useState } from "react"
import { getCookieUserData } from "../util/getCookieUserData"

export const AuthContext = createContext();;

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(getCookieUserData());

    function setUser() {
        setAuth(getCookieUserData());
    }

    function clearUser() {
        
    }

    const values = {
        auth,
        setUser
    }

    return (
        <AuthContext.Provider value={values} >
            {children}
        </AuthContext.Provider>
    )
}