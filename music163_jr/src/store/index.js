import { createStore,applyMiddleware } from "redux";

// 引入thunk中间件(可以让派发的action可以是一个函数)
import thunk from 'redux-thunk'

// 引入合并后的reducer
import cReducer from "./reducer";

// 创建store并传递
const store = createStore(cReducer,applyMiddleware(thunk))

export default store

