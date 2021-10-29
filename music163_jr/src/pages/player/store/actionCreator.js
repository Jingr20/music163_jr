import * as actionTypes from './actionTypes';
import {getSongDetail} from '@/service/player';

// 歌曲详情Action
const changeCurrentSongAction = res =>({
        type:actionTypes.CHANGE_CURRENT_SONG,
        currentSong:res.songs[0]
    })

export const getSongDetailAction = id =>{
    return dispatch => {
        getSongDetail(id).then(res => {
            dispatch(changeCurrentSongAction(res));
        });
    }
}
