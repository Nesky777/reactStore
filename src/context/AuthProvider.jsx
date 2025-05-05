import { authReducer, initialState } from "./AuthReducer";

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (credentials) => {
        dispatch({ type: 'LOGIN_REQUEST'});
        try {
            const user = await fakeApiLogin(credentials);
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            } catch (error) {
                dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
            
        }
    }
        const logout = () => dispatch({ type: 'LOGOUT'});

        return (
            <AuthContext.Provider value={{ ...state, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
}