import Draggable from 'react-draggable';
import {Modal,message,Button} from 'antd';
import {LoginWrapper,LoginLeft,LoginRight,PhoneLoginModal} from './style';
import LoginIcon from 'components/theme-controls-icon/login';
import {useSelector,shallowEqual,useDispatch} from 'react-redux';
import {changeIsVisible} from './store/actionCreator';
import {useRef, useState} from 'react';
import ThemeLoginForm from '../theme-login-form';


function ThemeLogin(){

    // 获取store中的数据
    const {isVisible} = useSelector(state=>({
        isVisible:state.loginState.isVisible
    }),shallowEqual);

    // 组件内状态
    const [loginState, setLoginState] = useState('default') // 默认登录模式
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
    

    const dispatch = useDispatch();


    /********* 取消 ********/
    function handleCancel(){
        // 关闭对话框
        dispatch(changeIsVisible(false));
        setBounds({ left: 0, top: 0, bottom: 0, right: 0 });
        // 延迟返回初始化状态
        setTimeout(() => {
            setLoginState('default');
        }, 100)
    }


    /********* 登录模式 ********/
    function handleLogin(loginMode){
        switch(loginMode){
            case 'phone':
                setLoginState('phone');
                break;
            case 'email':
                setLoginState('email');
                break;
            case 'register':
                setLoginState('register');
                break;
            default:
        }
    }



    // JSX 默认展示登录页面
    const defaultWrapperContent = (
        <LoginWrapper>
            <LoginLeft>
                <div className='login-content'>
                    <div className='login-bg'></div>
                    <Button
                        type="primary"
                        className='btn'
                        onClick={()=>{handleLogin('phone')}}
                    >
                        手机号登录
                    </Button>
                    <Button
                        type='ghost'
                        className='btn'
                        // onClick={() => handleLogin('register')}
                        onClick={() => message.warn('暂未开通')}
                    >
                        注册
                    </Button>
                </div>
            </LoginLeft>
            <LoginRight>
                <div className='icons-wrapper'>
                    <LoginIcon
                        onClick={() => message.warn('暂未开通')}
                        position="-150px -670px"
                        description="微信登录"
                    />
                    <LoginIcon
                        onClick={() => message.warn('暂未开通')}
                        position="-190px -670px"
                        description="QQ登录"
                    />
                    <LoginIcon
                        onClick={() => message.warn('暂未开通')}
                        position="-231px -670px"
                        description="微博登录"
                    />
                    <LoginIcon
                        onClick={() => message.warn('稍后')}
                        position="-271px -670px"
                        description="网易邮箱登录"
                    />

                </div>
            </LoginRight>
        </LoginWrapper>
    );

    /********* 展示登录模式对应的页面 ********/
    function chooseLoginModel(loginState){
        return (
            <>
            <PhoneLoginModal>
                <ThemeLoginForm/>
            </PhoneLoginModal>
            <a href='/#' onClick={()=>{setLoginState('default')}} style={{color:'#1890ff'}}>&lt;其它登录方式</a>
            </>
        );
    }

    const draggleRef = useRef()
    /********* 拖拽 ********/
    function onStart(event, uiData){
        console.log('---->拖拽')
        const { clientWidth, clientHeight } = window?.document?.documentElement
        const targetRect = draggleRef?.current?.getBoundingClientRect()
        setBounds({
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        })
    }


    return (
            <Modal
                centered={true}
                footer={null}
                visible={isVisible}
                title={
                    <div
                        style={{width: '100%',cursor:'move',color:'#ccc'}}
                        
                    >
                        {loginState === 'register' ? '注册' : '登录'}
                    </div>
                }
                onCancel={handleCancel}
                modalRender={(modal) => (
                    <Draggable
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                  )}
            >
                {loginState === 'default' ? defaultWrapperContent : null}
                {loginState === 'phone'? chooseLoginModel(loginState):null}
            </Modal>
    );
}

export default ThemeLogin;