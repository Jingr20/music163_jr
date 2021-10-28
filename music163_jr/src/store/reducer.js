import { combineReducers } from "redux";

// 引入recommend页面的store
import { reducer as recommendReducer } from '@/pages/discover/child-pages/recommend/store'

// 将多个reducer合并
const cReducer = combineReducers({
  recommend: recommendReducer
})
export default cReducer
