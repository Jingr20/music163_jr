import { gotoPhoneLogin } from '@/service/login';
import * as actionTypes from './actionTypes';
import md5 from 'js-md5';
import {message} from 'antd';
import loginInfo from '@/config/token';
import {setLoginInfo} from '@/utils/secret-key'

// 更改登录框显示
export const changeIsVisible = res => ({
    type:actionTypes.CHANGE_IS_VISIBLE_STATE,
    isVisible:res
})

// 更改登录状态
export const changeUserLoginState = res => ({
    type:actionTypes.CHANGE_USER_LOGIN_STATE,
    isLogin:res
})

// 更改登录用户信息
export const changeUserProfile = res => ({
    type: actionTypes.CHANGE_PROFILE_INFO,
    profile: res
})

// 更改登录状态(token)
export const changeUserLoginToken = res => ({
    type: actionTypes.CHANGE_PROFILE_TOKEN,
    token:res
})

// 更改登录状态(cookie)
export const changeUserLoginCookie = res => ({
    type: actionTypes.CHANGE_PROFILE_COOKIE,
    cookie:res
})

// 获取登录信息
export const getLoginProfileInfo = (username, password, tip)=>{
    return dispatch =>{
        gotoPhoneLogin(username,undefined,md5(password)).then((res)=>{
        // gotoPhoneLogin(username,password).then((res)=>{
            console.log(res);
            if(res.code !== 200){
                message.error('账号或密码错误')
            }else{
                // 登录成功
                document.cookie = res.cookie;
                // 保存用户信息
                dispatch(changeUserProfile(res && res.profile));
                // 更改登录状态
                dispatch(changeUserLoginState(true))
                dispatch(changeUserLoginToken(res.token))
                dispatch(changeUserLoginCookie(res.cookie))

                // 保存登录信息(以便于下次自动登录)
                loginInfo.username = username;
                loginInfo.password = password;
                loginInfo.state = true;

                // let newLoginInfo = Object.assign(getLoginInfo('loginInfo'), loginInfo)
                // setLoginInfo('loginInfo', newLoginInfo);
                setLoginInfo('loginInfo', loginInfo);
                // console.log(getLoginInfo('loginInfo'));
                // 关闭对话框
                dispatch(changeIsVisible(false))
            }
        });
    }
}
  

