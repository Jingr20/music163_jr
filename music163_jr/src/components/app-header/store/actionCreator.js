import { getSearchSongData } from '@/service/theme-header';
import * as actionTypes from './actionTypes';

// 搜索歌曲Action
const changeSearchSongListAction = res => ({
    type: actionTypes.CHANGE_SEARCH_SONG_LIST,
    searchSongList:res
});

// 改变焦点状态
export const changeFocusStateAction = res => ({
    type: actionTypes.CHANGE_FOCUS_STATE,
    focusState:res
})

// 搜索歌曲network
export const getSearchSongListAction = (searchStr) =>{
    return (dispatch)=>{
        getSearchSongData(searchStr).then((res)=>{
            const songList = res.result && res.result.songs
            dispatch(changeSearchSongListAction(songList));
        });
    }
}