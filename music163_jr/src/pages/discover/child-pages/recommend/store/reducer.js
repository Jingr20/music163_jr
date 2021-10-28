import * as actionTypes from './actionTypes'

const defaultState = {
    topBanners: [],
    hotRecommend:[]
}

function reducer(state = defaultState, action){
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNER:
            return {
                ...state,
                topBanners:action.topBanners.banners
            }
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return {
                ...state,
                hotRecommend: action.hotRecommend.result
            }
        default:
            return state
        
    }
}

export default reducer;