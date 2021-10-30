import * as actionTypes from './actionTypes';

const defaultState = {
    currentSong: {},
    currentSongPlayUrl:{}
}

function reducer(state=defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_CURRENT_SONG:
            return {
                ...state,
                currentSong:action.currentSong
            };
        case actionTypes.CHANGE_CURRENT_SONG_PLAY_URL:
            return {
                ...state,
                currentSongPlayUrl:action.currentSongPlayUrl
            };
        default:
            return state;
    }
}

export default reducer;