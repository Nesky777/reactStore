import { createContext, useState, useEffect, useReducer } from "react";
import { authReducer, initialState } from "./AuthReducer";
import { AUTH_ACTIONS } from "./AuthReducer";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
// const [user, setUser] = useState(null);
// const [token, setToken] = useState(null);
const [state, dispatch] = useReducer(authReducer, initialState);

useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedToken && storedUser){
        dispatch({
            type: AUTH_ACTIONS.LOAD_USER_FROM_STORAGE,
            payload: {
                token: storedToken,
                user: storedUser
            }
        });
        // dispatch({})
        // setToken(storedToken);
        // setUser(storedUser);
    }
}, []);

const login =(newToken,newUser) => {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userData", JSON.stringify(sewUser0));
    setToken(newToken);
    setUser(newUser);
};
const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setToken(null);
    setUser(null);
};

return (
    <AuthContext.Provider value={{ 
        // user, token, login, logout
        user: state.user,
        token: state.token,
        isLoading: state.isLoading,
        error: state.error,
        login,
        logout
        }}>
    {children}
    </AuthContext.Provider>
);
};