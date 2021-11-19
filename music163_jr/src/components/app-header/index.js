import React,{useRef,useCallback,useState} from 'react';
import {headerLinks} from '@/common/local-data';
import {NavLink} from 'react-router-dom';
import {HeaderWrapper,HeaderLeft,HeaderRight} from './style';
import {Input,Dropdown,Menu} from 'antd';
import {SearchOutlined } from '@ant-design/icons';
import {useSelector,shallowEqual,useDispatch} from 'react-redux';
import {
    getSearchSongListAction,
    changeFocusStateAction} from './store/actionCreator';
import { getSongDetailAction,changeIsPlayingAction } from '@/pages/player/store/actionCreator';
import { changeIsVisible,changeUserLoginState} from '@/components/theme-login/store/actionCreator';
import ThemeLogin from '@/components/theme-login';

function AppHeader(){

    // 获取store中的数据
    const {
        searchSongList,
        focusState,
        isLogin,
        profile
        } = useSelector((state) =>({
            searchSongList:state.search.searchSongList,
            focusState:state.search.focusState,
            isLogin:state.loginState.isLogin,
            profile:state.loginState.profile
        }),shallowEqual);

    //组件内状态
    const [value,setValue] = useState('');



    const inputRef = useRef();
    const dispatch = useDispatch();

    
    /****** 获取焦点触发函数 *******/ 
    const handleFocus = useCallback(() => {
        // 显示下拉框
       dispatch(changeFocusStateAction(true));
       
    },[])// eslint-disable-line react-hooks/exhaustive-deps


    /****** 获取焦点触发函数 *******/ 
    const handleBlur = useCallback((target) => {
        setTimeout(()=>{
            dispatch(changeFocusStateAction(false));
        },400);
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    /****** 搜索歌曲触发函数 *******/
    const changeInput = useCallback((target)=>{
        let value = target.value;
        setValue(value);
        // 发送网络请求
        dispatch(getSearchSongListAction(value));
    },[]);// eslint-disable-line react-hooks/exhaustive-deps


    /****** 点击当前item歌曲项 *******/
    async function changeCurrentSong(id,item){
        // 1)放到搜索文本框
        setValue(item.name + '-' + item.artists[0].name);
        // 3)隐藏下拉框
        dispatch(changeFocusStateAction(false));
        // 2)派发action,获取歌曲详情
        await dispatch(getSongDetailAction(id));
        // 4)播放音乐
        // document.getElementById('audio').autoplay = true;
        dispatch(changeIsPlayingAction(true));
    }

    /****** 登录状态显示头像 *******/
    function showProfileContent(){
        return (
            <img src={profile.avatarUrl} alt="" className="profile-img" />
        )
    }

    /****** 退出登录 *******/
    function clearLoginState(){
        dispatch(changeUserLoginState(false));
        dispatch(changeIsVisible(false));
        localStorage.clear()
        // window.location.reload()
    }

    
    /****** 登录后下拉菜单DropDown的menu *******/
    function profileDwonMenu(){
        return (
            isLogin?(
                <Menu>
                    <Menu.Item>
                        <a
                        href="/#"
                        onClick={(e) => e.preventDefault()}
                        >
                            {profile.nickname}
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a
                        href="/#"
                        onClick={(e) => e.preventDefault()}
                        >
                            我的主页
                        </a>
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => clearLoginState()}
                    >
                        退出登录
                    </Menu.Item>
                </Menu>
            ):''
        );
    }


    return (
        <HeaderWrapper>
             <div className='content'>
                <HeaderLeft>
                    <a href="#/" className="logo sprite_01"> </a>
                    <div className='header-group'>
                        {
                            headerLinks.map((item) => (
                                <NavLink  
                                    key={item.title} 
                                    to={item.link} 
                                    className='header-item'
                                    activeClassName="link-active"
                                >
                                    {item.title}
                                    <i className='icon'></i>
                                </NavLink>
                            ))
                        } 
                    </div> 
                </HeaderLeft>
                    
                <HeaderRight>
                    <div className='search-wrapper'>
                        <Input
                            placeholder="音乐/歌手"
                            prefix={<SearchOutlined />}
                            className='search'
                            ref={inputRef}
                            onFocus={handleFocus}
                            onInput={()=>{console.log('onInput');}}
                            onChange={({target})=>{changeInput(target)}}
                            value={value}
                            onBlur={(target)=>{handleBlur(target)}}
                        />

                        <div
                            className="down-slider"
                            style={{ display: focusState ? 'block' : 'none' }}
                        >
                            <div className="search-header">
                                <span className="discover">搜"歌曲"相关用户&gt;</span>
                            </div>
                            <div className="content">
                                <div className="zuo">
                                    <span className="song">单曲</span>
                                </div>

                                <span className="main">
                                    {
                                        searchSongList &&
                                        searchSongList.map((item, index) => {
                                        return (
                                            <div
                                                className={
                                                    'item'
                                                }
                                                key={item.id}
                                                onClick={() => changeCurrentSong(item.id, item)}
                                            >
                                                <span>{item.name}-{item.artists[0].name}</span>
                                            </div>
                                        );
                                    })}
                                </span>
                            </div>
                        </div>
                            
                    </div>
                    <div className="center">创作者中心</div>
                    {/* <div className='login'>登录</div> */}
                    <Dropdown overlay={profileDwonMenu}>
                        <div className='login' onClick={()=>{!isLogin && dispatch(changeIsVisible(true))}}>
                            <a href='/#'>
                                {isLogin ? showProfileContent() : '登录'}
                            </a>
                        </div>
                    </Dropdown>
                </HeaderRight>
            </div>
            <div className='redline'></div>
            <ThemeLogin/>
        </HeaderWrapper>
        );
}

export default AppHeader;