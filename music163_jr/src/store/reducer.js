import { combineReducers } from "redux";

// 引入recommend页面的store
import { reducer as recommendReducer } from '@/pages/discover/child-pages/recommend/store'
// 引入底部appPlayerBar的store
import {reducer as currentSongReducer} from '@/pages/player/store';
// 引入顶部搜索栏的store
import {reducer as searchReducer} from '@/components/app-header/store';
// 引入登录的store
import {reducer as loginReducer} from '@/components/theme-login/store';

// 将多个reducer合并
const cReducer = combineReducers({
  recommend: recommendReducer,
  player:currentSongReducer,
  search:searchReducer,
  loginState:loginReducer
})
export default cReducer
