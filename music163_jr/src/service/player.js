import request from './request';

// 歌曲详情页
export function getSongDetail(ids){
    return request({
        url:'/song/detail',
        params:{
            ids
        }
    });
}

// 歌曲播放音频地址
export function getSongPlayUrl(id){
    return request({
        url:'/song/url',
        params:{
            id
        }
    });
}
