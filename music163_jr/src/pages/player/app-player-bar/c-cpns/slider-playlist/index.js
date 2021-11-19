import {SliderPlaylistWrapper,SliderPlaylistHeader,SliderPlaylistMain} from './style';
import { ClearOutlined, CloseOutlined, HeartOutlined } from '@ant-design/icons';
import {
    changePlaylistAndCount,
    getSongDetailAction
} from '../../../store/actionCreator';
import {useSelector,useDispatch} from 'react-redux';
import {useRef} from 'react';
import PlaylistItem from './c-cpns/playlist-item';
import LyricContent from './c-cpns/lyric-content';


function SliderPlaylist(props){

    // 获取父组件的传值
    const {
        isShowSlider,
        playlistCount,
        closeWindow,
        changeSong,
    } = props;

    // 获取store中的数据
    const { currentSong, playList, currentSongIndex } = useSelector(state => ({
        playList: state.player.playList,
        currentSong: state.player.currentSong,
        currentSongIndex: state.player.currentSongIndex
    }))

    const dispatch = useDispatch()
    const playlistRef = useRef()


    // 清除全部歌曲
    function clearAllPlaylist(e){
        e.preventDefault();
        playList.splice(0, playList.length);
        dispatch(changePlaylistAndCount(playList));
    }


    return (
        <SliderPlaylistWrapper
            style={{ visibility: isShowSlider ? 'visible' : 'hidden' }}
            // 阻止事件冒泡，会触发父元素button的setIsShowSlide事件，导致音乐列表隐藏
            onClick={(e) => e.stopPropagation()}
        >
            <SliderPlaylistHeader>
                <div className="playlist-header-left">
                    <h3 className="header-title">播放列表({playlistCount})</h3>
                    <div>
                        <a href='/#' className='header-icon' onClick={(e) => e.preventDefault()}>
                            <HeartOutlined/>
                            <span>收藏一下</span>
                        </a>
                        <a href="/#" onClick={(e) => clearAllPlaylist(e)} className="header-icon">
                            <ClearOutlined />
                            <span>清除播放列表</span>
                        </a>
                    </div>
                </div>
                <div className='playlist-header-right'>
                    <div className="song-name">{currentSong.name}</div>
                    <div className="close-window" onClick={closeWindow}><CloseOutlined /></div>
                    
                </div>
            </SliderPlaylistHeader>
            <SliderPlaylistMain ref={playlistRef}>
                <div className='main-playlist'>
                    {
                        playList &&
                        playList.map((item,index)=>{
                            return (
                                <PlaylistItem
                                    key={item.id}
                                    isActive={
                                        (currentSongIndex ? currentSongIndex : 0) === index? 'active': ''
                                    }
                                    songName={item.name}
                                    singer={item.ar[0].name}
                                    clickItem={() => {dispatch(getSongDetailAction(item.id))}}
                                    songId={item.id}
                                    nextMusic={() => changeSong(1)}
                                    duration = {item.dt}
                                />
                            )
                        })
                    }
                </div>
                <LyricContent/>
            </SliderPlaylistMain>
        </SliderPlaylistWrapper>
    );
}

export default SliderPlaylist;