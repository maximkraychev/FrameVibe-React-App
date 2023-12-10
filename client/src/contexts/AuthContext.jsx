import { createContext, useState } from "react"
import { LOCAL_STORAGE } from "../constants/localStorageState";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const [authState, setAuthState] = useState(() => {
        const persistedState = localStorage.getItem(LOCAL_STORAGE.AUTH);

        if (persistedState) {
            return JSON.parse(persistedState);
        }

        return {};
    });

    const setPersistedState = (value) => {
        setAuthState(value);

        let serializedValue;
        if (typeof value === 'function') {
            serializedValue = JSON.stringify(value(state));
        } else {
            serializedValue = JSON.stringify(value);
        }

        localStorage.setItem(LOCAL_STORAGE.AUTH, serializedValue);
    };


    const clearState = () => {
        localStorage.removeItem(LOCAL_STORAGE.AUTH);
        setAuthState({});
    }


    const values = {
        auth: authState?.userDetails,
        isAuthenticated: !!authState?.accessToken,
        accessToken: authState?.accessToken,
        setPersistedState,
        clearState
    }

    return (
        <AuthContext.Provider value={values} >
            {children}
        </AuthContext.Provider>
    )
}


// const loginSubmitHandler = async (values) => {
//     const result = await loginService(values.email, values.password);

//     setAuth(result);

//     localStorage.setItem('accessToken', result.accessToken);


//     navigate(PATH.EXPLORE);
// }

// const registerSubmitHandler = async (values) => {
//     const result = await registerService(values.email, values.username, values.password);

//     setAuth(result);

//     localStorage.setItem('accessToken', result.accessToken);

//     navigate(PATH.EXPLORE);
// }

// const logoutHandler = () => {
//     setAuth({});
//     localStorage.removeItem('accessToken');
// };