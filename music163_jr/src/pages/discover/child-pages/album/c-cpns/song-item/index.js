import {useDispatch} from 'react-redux';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// import { useAddPlaylist } from '@/hooks/change-music'
import { getSizeImage } from '@/utils/format-utils.js';
import { getSongDetailAction,changeIsPlayingAction } from '@/pages/player/store/actionCreator';
import { SongItemWrapper } from './style';
import { PlayCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';

function SongItem(props) {
    // 父组件传递的数据
    const {
        currentRanking,
        coverPic,
        duration,
        singer,
        songId,
        songName,
        className = '',
    } = props

    // 获取store中的数据
    // const {playlist} = useSelector(state => ({
    //     playlist: state.player.playlist
    // }), shallowEqual)

    const dispatch = useDispatch()



    /*************** 播放音乐 *************/
    async function playMusic(e, isTo = false){
        // 如果不跳转,阻止超链接的默认行为
        if (!isTo) e.preventDefault()
        await dispatch(getSongDetailAction(songId))
        // 播放音乐
        dispatch(changeIsPlayingAction(true))
    }

    /*************** 往播放列表里添加数据 *************/
    // const addPlaylist = useAddPlaylist(playlist, message)


  return (
    <SongItemWrapper className={className} isPic={coverPic}>
        {/* 排名 */}
        <div className="song-item rank-count">{currentRanking}</div>
        {/* 歌曲图片 */}
        {coverPic && (
        <NavLink
          to="/discover/song"
          className="song-item"
          onClick={(e) => playMusic(e)}
        >
            <img src={getSizeImage(coverPic, 50)} alt="" />
        </NavLink>
        )}
        <div className="song-item song-info">
            <div className="left-info">
                {/* 播放图标 */}
                <PlayCircleOutlined className="font-active" onClick={(e) => playMusic(e)}/>
                {/* 歌曲名称 */}
                <a href="/play" onClick={(e) => playMusic(e)} className="text-nowrap">
                    {songName}
                </a>
            </div>
            {/* 加入图标 */}
            <div className="right-operator">
                <button className="sprite_icon2 btn addto"
                    // onClick={e => addPlaylist(e,songId)}
                    onClick={()=> message.warn('暂未开通')}
                ></button>
            </div>
        </div>
        {/* 时长 */}
        <div className="song-item duration">{duration}</div>
        <NavLink
            to="/discover/song"
            className="song-item singer"
            // onClick={(e) => playMusic(e)}
            onClick={()=> message.warn('暂无歌手详情页面')}
        >
            {singer}
        </NavLink>
    </SongItemWrapper>
  )
}

SongItem.propTypes = {
  currentRanking: propTypes.number.isRequired,
  coverPic: propTypes.string,
  duration: propTypes.string.isRequired,
  singer: propTypes.string.isRequired,
  songId: propTypes.number.isRequired,
  className: propTypes.string,
  songName: propTypes.string.isRequired,
}

export default SongItem;
