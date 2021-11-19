import * as actionTypes from './actionTypes';

const defaultState = {
    isVisible:false,
    isLogin: false, // 登录状态
    profile: '',
    token: '',
    cookie: ''
};

function reducer(state=defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_IS_VISIBLE_STATE:
            return {
                ...state,
                isVisible:action.isVisible
            };
        case actionTypes.CHANGE_USER_LOGIN_STATE:
            return {
                ...state,
                isLogin:action.isLogin
            };
        case actionTypes.CHANGE_PROFILE_INFO:
            return {
                ...state,
                profile:action.profile
            };
        case actionTypes.CHANGE_PROFILE_TOKEN:
            return {
                ...state,
                token:action.token
            };
        case actionTypes.CHANGE_PROFILE_COOKIE:
            return {
                ...state,
                cookie:action.cookie
            };
        default:
            return state;
    }
}

export default reducer;