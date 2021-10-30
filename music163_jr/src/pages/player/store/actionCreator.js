import * as actionTypes from './actionTypes';
import {getSongDetail,getSongPlayUrl} from '@/service/player';

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

// 歌曲音乐播放urlAction
const changeCurrentSongPlayUrlAction = res => ({
    type:actionTypes.CHANGE_CURRENT_SONG_PLAY_URL,
    currentSongPlayUrl:res.data[0]
})

export const getSongPlayUrlAction = id =>{
    return dispatch => {
        getSongPlayUrl(id).then((res) => {
            dispatch(changeCurrentSongPlayUrlAction(res));
        });
    }
}
