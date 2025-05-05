export const AUTH_ACTIONS = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "lOGIN_FAILURE",
    LOGOUT: "LOGOUT",
    LOAD_USER_FROM_STORAGE: "LOAD_USER_FROM_STORAGE",
};

export const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

export function authReducer(state, action) {
    switch (action.type) {
        // case 'LOGIN_REQUEST':
        //     return{ ...state, isLoading: true };
        //     case'LOGIN_SUCCESS':
        //     return{ ...state, user: action.payload, isLoading: false };
        //     case 'LOGIN_FAILURE':
        //     return { ...state, error: action.payload, isLoading: false};
        //     case 'LOGOUT':
        //         return { ...state, user: null };
        //         default:
        //         return state;
        case AUTH_ACTIONS.LOGIN_REQUEST:
            return{
                ...state,
                isLoading: true,
                error: null,
            }
    }
}