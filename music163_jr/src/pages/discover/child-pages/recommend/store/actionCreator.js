import * as actionTypes from './actionTypes';
import {getTopBanners,getHotRecommend} from '@/service/recommend';

// 轮播图Action
export const changeTopBannerAction = res => ({
    type: actionTypes.CHANGE_TOP_BANNER,
    topBanners: res,
})

// 轮播图网络请求
export const getTopBannersAction = () => {
    return dispatch => {
      // 发送网络请求
        getTopBanners().then(res => {
            dispatch(changeTopBannerAction(res))
        })
    }
}

// 热门推荐Action
export const changeHotRecommendAction = res => ({
    type: actionTypes.CHANGE_HOT_RECOMMEND,
    hotRecommend:res
})

// 热门推荐网络请求
export const getHotRecommendAction = ()=>{
    return dispatch => {
        getHotRecommend().then(res => {
            dispatch(changeHotRecommendAction(res))
        })
    }
}