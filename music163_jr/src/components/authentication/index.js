import { message, Skeleton } from 'antd';
import {useEffect} from 'react';
import propTypes from 'prop-types'

function  Auth(props){
    const { flag } = props;

    useEffect(()=>{
        if(!flag){
            message.loading('请先登录, 再看每日推荐歌单', 2).then(() => {
                props.to()
                props.showModal()
            })
        }
    },[flag,props]);

    return (
        <div style={{ display: !flag ? 'block' : 'none' }}>
            <Skeleton active  />
        </div>
    );
}

Auth.propTypes = {
    flag: propTypes.bool.isRequired,
}

export default Auth;