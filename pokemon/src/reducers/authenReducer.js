
const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    return null;
};

const clearToken = () => {
    window.localStorage.removeItem('token'); //remove one item
};

const initialState = {
    token: getToken(),
    isLogin: false
};

const authenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN': {
            return {
                ...state,
                token: action.payload,
            };
        }
        case 'LOG_OUT': {
            clearToken();

            return {
                ...state,
                token: null,
            };
        }
        default:
            return state;
    }
};

export default authenReducer;
