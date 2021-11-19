import {PlaylistItemWrapper} from './style';
import { DownloadOutlined,DeleteOutlined,LikeOutlined } from '@ant-design/icons'
import { formatDate} from '@/utils/format-utils.js'
import propTypes from 'prop-types'
import {message} from 'antd';

function PlaylistItem(props){

    // 获取父组件的值
    const {songName,singer, duration, isActive, clickItem} = props


    return (
        <PlaylistItemWrapper className={isActive} onClick={clickItem}>
            <div className="song-name">{songName}</div>
            <div className="control-and-singer">
                <LikeOutlined onClick={()=> message.warn('尚未开通')}/>
                <DownloadOutlined onClick={()=> message.warn('尚未开通')} />
                <DeleteOutlined onClick={()=> message.warn('尚未开通')}/>
                <span onClick={()=> message.warn('尚未开通')}>{singer}</span>
            </div>
            <div className="duration">{formatDate(duration, 'mm:ss')}</div>
        </PlaylistItemWrapper>
    );
}

PlaylistItem.propTypes = {
    songName: propTypes.string.isRequired,
    singer: propTypes.string.isRequired,
    duration: propTypes.any.isRequired,
    isActive: propTypes.string
}

export default PlaylistItem;