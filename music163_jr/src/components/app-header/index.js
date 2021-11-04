import React,{useRef,useCallback,useEffect} from 'react';
import {headerLinks} from '@/common/local-data';
import {NavLink} from 'react-router-dom';
import {HeaderWrapper,HeaderLeft,HeaderRight} from './style';
import {Input} from 'antd';
import {SearchOutlined } from '@ant-design/icons';
import {useSelector,shallowEqual,useDispatch} from 'react-redux';
import {
    getSearchSongListAction,
    changeFocusStateAction,
} from './store/actionCreator';

function AppHeader(){

    // 获取store中的数据
    const {
        searchSongList,
        focusState
        } = useSelector((state) =>({
            searchSongList:state.search.searchSongList,
            focusState:state.search.focusState
        }),shallowEqual);



    const inputRef = useRef();
    const dispatch = useDispatch();

    
    // 获取焦点
    const handleFocus = useCallback(() => {
        // 显示下拉框
        dispatch(changeFocusStateAction(true));
    },[])// eslint-disable-line react-hooks/exhaustive-deps


    // 失去焦点
    const handleBlur = useCallback(() => {
        // 隐藏下拉框
        dispatch(changeFocusStateAction(false));
    },[])// eslint-disable-line react-hooks/exhaustive-deps


    // 搜索歌曲
    const changeInput = useCallback((target)=>{
        let value = target.value;
        // 发送网络请求
        dispatch(getSearchSongListAction(value));
    },[]);// eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        console.log(searchSongList);
    }, [searchSongList])


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
                            onBlur={handleBlur}
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
                                                // onClick={() => changeCurrentSong(item.id, item)}
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
                    <div className='login'>登录</div>
                </HeaderRight>
            </div>
            <div className='redline'></div>
        </HeaderWrapper>

        );
}

export default AppHeader;