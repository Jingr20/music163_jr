import {PlayerbarWrapper,PlayerInfo,Control,Operator} from './style';
import {Slider,Tooltip} from 'antd';
import {useDispatch,useSelector,shallowEqual} from 'react-redux';
import {useEffect,useState,useRef} from 'react';
import {getSongDetailAction} from '../store/actionCreator';
import {getSizeImage, formatDate,getPlayUrl} from '@/utils/format-utils.js';

function AppPlayerBar(){
    console.log('组件渲染');

    //发送网络请求，请求歌曲详情
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log('请求歌曲详情');
        dispatch(getSongDetailAction(167874));
    },[dispatch]);

    // 获取store中的数据
    const {currentSong} = useSelector((state)=>({
        currentSong:state.player.currentSong
    }),shallowEqual); 

    // other handle
    const picUrl = currentSong.al && currentSong.al.picUrl; // 图片url
    const songName = currentSong.name; // 歌曲名字
    const singerName = currentSong.ar && currentSong.ar[0].name; //作者名字
    const duration = currentSong.dt; //播放总时间

    // 组件内state
    const [isPlaying,setIsPlaying] = useState(false); // 是否正在播放

    const audioRef = useRef();

    /***** 点击播放/暂停音乐 ****/
    function playMusic(){
        // 更改状态
        setIsPlaying(!isPlaying);
        // isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }

    /***** 设置音频的src ****/
    // useEffect(()=>{
    //     audioRef.current.src = getPlayUrl(currentSong.id);
    //     // 设置音量
    //     audioRef.current.volume = 0.3;
    // },[])

    return (
        <PlayerbarWrapper className='sprite_player'>
            <div className='content'>
                <Control isPlaying={isPlaying}>
                    <button className='sprite_player pre'></button>
                    <button className='sprite_player play' onClick={playMusic}></button>
                    <button className='sprite_player next'></button>
                </Control>
                <PlayerInfo>
                    <a href='#/discover/song' className='image'>
                        <img src={getSizeImage(picUrl, 35)} alt=''/>
                    </a>
                    <div className='play-detail'>
                        <div className='song-info'>
                            <a className='song-name' href='#/discover/song'>{songName}</a>
                            <a className='song-author' href='#/author'>{singerName}</a>
                        </div>
                        <Slider/>
                        <div className='song-time'>
                            <span className='now-time'>XXX</span>
                            <span className='total-time'>
                                {' '}
                                / {duration && formatDate(duration, 'mm:ss')}
                            </span>
                        </div>
                    </div>
                </PlayerInfo>
                <Operator>
                    {/* 左侧暂时不实现 */}
                    <div className='left'></div>
                    <div className='right'>
                        <Tooltip title='调节音量'>
                            <button className='sprite_player btn volume'></button>
                        </Tooltip>
                        <Tooltip
                            title={['顺序播放','随机播放','单曲循环'].filter((item,index)=>(
                                index === 0
                            ))}
                        >
                            <button className='sprite_player btn loop'></button>
                        </Tooltip>
                        <Tooltip title='播放列表'>
                            <button className='sprite_player btn playlist'>
                                <span>9</span>
                            </button>
                        </Tooltip>
                    </div>
                </Operator>
            </div>
            {/* <audio
                id="audio"
                ref={audioRef}
                preload="auto"
            /> */}
        </PlayerbarWrapper>
    );
}

export default AppPlayerBar;