import * as actionTypes from './actionTypes';
import {getSongDetail,
        getSongPlayUrl,
        getLyric} from '@/service/player';
import { getRandomNumber } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric'

// 歌曲详情Action
const changeCurrentSongAction = res =>({
    type:actionTypes.CHANGE_CURRENT_SONG,
    currentSong:res
})
// 当前歌曲索引Action
const changeSongIndexAction = res =>({
    type:actionTypes.CHANGE_CURRENT_SONG_INDEX,
    currentSongIndex:res
})
// 歌曲列表Action
const changePlayListAction = res =>({
    type:actionTypes.CHANGE_PLAY_LIST,
    playList:res
})

// 改变歌曲数量
const changePlayListCount = res => ({
    type: actionTypes.CHANGE_PLAY_LIST_COUNT,
    playListCount:res
})


// 首次加载Action
export const changeFirstLoad = res => ({
    type: actionTypes.CHANGE_FIRST_LOAD,
    firstLoad: res
})

// 获取歌曲详情
export const getSongDetailAction = (id) =>{
    return (dispatch,getState) => {
        // 1、根据id查找palyList里是否有该歌曲
        const playList = getState().player.playList;
        const songIndex = playList.findIndex(song => song.id===id);
        
        if(songIndex !== -1){
            // 2、找到歌曲
            dispatch(changeSongIndexAction(songIndex));
            dispatch(changeCurrentSongAction(playList[songIndex]));
            dispatch(changeCurrentSongPlayUrlAction(id));
            dispatch(getLyricAction(id))

        }else{
            // 3、没找到歌曲
            // 请求数据
            getSongDetail(id).then(res => {
                const song = res.songs && res.songs[0];
                playList.push(song);
                // (1)添加到播放列表中
                dispatch(changePlayListAction(playList));
                let songIndex = playList.length-1;
                // (2)更改当前播放的索引
                dispatch(changeSongIndexAction(songIndex));
                // (3)更改当前播放歌曲
                dispatch(changeCurrentSongAction(playList[songIndex]));
                // (4)更改当前播放歌曲url
                dispatch(changeCurrentSongPlayUrlAction(id));
                // (5)更新歌曲数量
                dispatch(changePlayListCount(playList.length));
                // (6)请求歌曲的歌词
                dispatch(getLyricAction(id))
            });

        }
    }
}

// 歌曲音乐播放urlAction
const changeCurrentSongPlayUrlAction = res => ({
    type:actionTypes.CHANGE_CURRENT_SONG_PLAY_URL,
    currentSongPlayUrl:res.data && res.data[0]
})

export const getSongPlayUrlAction = id =>{
    return dispatch => {
        getSongPlayUrl(id).then((res) => {
            dispatch(changeCurrentSongPlayUrlAction(res));
        });
    }
}

// 更改播放顺序Action
export const changePlaySequenceAction = (res) => ({
    type: actionTypes.CHANGE_PLAY_SEQUENCE,
    playSequence:res
})

// 切换歌曲Action
export const changeCurrentIndexAndSongAction = (tag) =>{
    return (dispatch,getState) => {
        // 根据playSequence决定是顺序播放还是随机播放
        const playSequence = getState().player.playSequence;
        // 播放列表
        const playList = getState().player.playList;
        // 当前播放的索引/下标
        let currentSongIndex = getState().player.currentSongIndex;

        // 根据播放顺序选择下一首音乐
        switch(playSequence){
            case 1: 
                // 随机播放
                let random = getRandomNumber(playList.length)
                while (random === currentSongIndex) {
                    random = getRandomNumber(playList.length)
                }
                // 更改当前播放音乐的下标
                currentSongIndex = random
                break;
            default:
                // 顺序播放
                currentSongIndex += tag
                // 判断当前音乐的下标是否超出播放列表长度
                if (currentSongIndex >= playList.length) currentSongIndex = 0;
                if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
        }
        // 获取需要播放的音乐
        const song = playList[currentSongIndex];
        // 更改当前播放的音乐
        dispatch(changeCurrentSongAction(song));
        dispatch(changeSongIndexAction(currentSongIndex))
        dispatch(changeCurrentSongPlayUrlAction(song.id));
        // 请求歌曲的歌词
        dispatch(getLyricAction(song.id))
    }
}

// 改变歌词Action
const changeLyricAction = (res) => ({
    type: actionTypes.CHANGE_LYRIC_LIST,
    lyricList:res
})

// 请求歌词
export const getLyricAction = (id) => {
    return async (dispatch) => {
      await getLyric(id).then((res) => {
        const lyric = res.lrc && res.lrc.lyric
        const lyricList = parseLyric(lyric)
    
        dispatch(changeLyricAction(lyricList))
      })
    }
  }


// 改变currentLyricIndex
export const changeCurrentLyricIndexAction = (res) => ({
    type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    currentLyricIndex:res
})

// 修改播放列表并修改歌曲数量
export const changePlaylistAndCount = (playlist) => {
    return (dispatch) => {
      dispatch(changePlayListAction(playlist))
      dispatch(changePlayListCount(playlist.length))
    }
}

// 改变歌曲播放状态
export const changeIsPlayingAction = (res) => ({
    type: actionTypes.CHANGE_ISPLAYING,
    isPlaying:res
})


