import request from './request';

// 轮播图
export function getTopBanners(){
    return request({
      url: "/banner"
    })
}

// 热门推荐 8条
export function getHotRecommend(){
  return  request({
    url:'/personalized?limit=8'
  })
}