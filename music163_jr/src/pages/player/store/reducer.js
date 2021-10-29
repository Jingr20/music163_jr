import * as actionTypes from './actionTypes';

const defaultState = {
    currentSong: {}
}

function reducer(state=defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_CURRENT_SONG:
            return {
                ...state,
                currentSong:action.currentSong
            };
        default:
            return state;
    }
}

export default reducer;