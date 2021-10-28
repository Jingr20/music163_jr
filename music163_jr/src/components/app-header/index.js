import React,{Component} from 'react';
import {headerLinks} from '@/common/local-data';
import {NavLink} from 'react-router-dom';
import {HeaderWrapper,HeaderLeft,HeaderRight} from './style';
import {Input} from 'antd';
import {SearchOutlined } from '@ant-design/icons';

class AppHeader extends Component {
    render(){
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
                        <Input
                            placeholder="音乐/歌手"
                            prefix={<SearchOutlined />}
                            className='search'/>
                        
                        <div className="center">创作者中心</div>
                        <div className='login'>登录</div>
                    </HeaderRight>
                </div>
                <div className='redline'></div>
            </HeaderWrapper>

        );
    }
}

export default AppHeader;