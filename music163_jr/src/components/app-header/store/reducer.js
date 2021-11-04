import * as actionTypes from './actionTypes';

const defaultState = {
    searchSongList: [],
    focusState: false
};

function reducer(state=defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_SEARCH_SONG_LIST:
            return {
                ...state,
                searchSongList:action.searchSongList
            };
        case actionTypes.CHANGE_FOCUS_STATE:
            return {
                ...state,
                focusState:action.focusState
            };
        default:
            return state;
    }
}

export default reducer;