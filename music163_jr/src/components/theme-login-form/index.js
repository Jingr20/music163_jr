import { Form, Input, Button, Checkbox } from 'antd'
import propTypes from 'prop-types';
import './style.css';
import { getParseLoginState} from '@/utils/format-utils';
import { getLoginProfileInfo } from '../theme-login/store/actionCreator';
import {useDispatch} from 'react-redux';

function ThemeLoginForm(props){

    const dispatch = useDispatch();

    // 拿到"登录的方式"
    const { loginState } = props

    // 提交表单-登录
    function onFinish({username,password}){
        // 手机号登陆
        // console.log(username,password);
        dispatch(getLoginProfileInfo(username,password));
    }

    return (
        // 只写了登录页面
        <Form
            style={{display: loginState !== 'register' ? 'block' : 'none'}}
            onFinish={onFinish}
        >
            <Form.Item
                label={getParseLoginState(loginState)}
                name='username'
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='密码'
                name="password"
            >
                <Input.Password />
            </Form.Item>
            <div className='textAlignRight'>
                <Checkbox className='mr80' defaultChecked={true}>自动登录</Checkbox>
                <span className='forgetPwd'>忘记密码?</span>
            </div>
            <Form.Item
                // wrapperCol= { {span:30 }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    size="middle"
                    block
                    shape="round"
                >
                    登录
                </Button>
            </Form.Item>

        </Form>
    );
}

ThemeLoginForm.propTypes = {
    loginState: propTypes.string,
}

ThemeLoginForm.defaultProps = {
    loginState: 'phone',
}

export default ThemeLoginForm;