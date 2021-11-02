import {PlayerbarWrapper,PlayerInfo,Control,Operator} from './style';
import {Slider,Tooltip} from 'antd';
import {useDispatch,useSelector,shallowEqual} from 'react-redux';
import {useEffect,useState,useRef} from 'react';
import {getSongDetailAction,
        getSongPlayUrlAction,
        changePlaySequenceAction,
        changeCurrentIndexAndSongAction} from '../store/actionCreator';
import {getSizeImage, formatDate} from '@/utils/format-utils.js';

function AppPlayerBar(){
    // console.log('AppPlayerBar组件渲染');

    // 获取store中的数据
    const {
        currentSong,
        currentSongPlayUrl,
        playSequence,
        playListCount
            } = useSelector((state)=>({
        currentSong: state.player.currentSong,
        currentSongPlayUrl: state.player.currentSongPlayUrl,
        playSequence:state.player.playSequence,
        playListCount:state.player.playListCount
    }),shallowEqual); 

    // 组件内state
    const [isPlaying,setIsPlaying] = useState(false); // 是否正在播放
    const [currentTime,setCurrentTime] = useState(0);  // 当前播放的时间
    const [progress,setProgress] = useState(0);  // 滑动条进度
    const [isChanging, setIsChanging] = useState(false); // 是否正在滑动
    // const [songId, setSongId] = useState(); // 是否正在滑动


    //发送网络请求，请求歌曲详情
    const dispatch = useDispatch();
    useEffect(()=>{
        // console.log('请求歌曲详情');
        dispatch(getSongDetailAction(167860));
    },[]); // eslint-disable-line react-hooks/exhaustive-deps


    // 判断当前是否拿到currentSong的数据（第一次渲染还未拿到异步数据）
    const picUrl = currentSong.al && currentSong.al.picUrl; // 图片url
    const songName = currentSong.name; // 歌曲名字
    const singerName = currentSong.ar && currentSong.ar[0].name; //作者名字
    const duration = currentSong.dt; //播放总时间
    const songPlayUrl = currentSongPlayUrl && currentSongPlayUrl.url; //音乐播放URL
    
    // 利用ref获取DOM元素
    const audioRef = useRef();


    /***** 设置音频src ****/
    useEffect(()=>{
        // console.log('设置音频******');
        if(currentSong.id){
            dispatch(getSongPlayUrlAction(currentSong.id));
            // 设置音量
            audioRef.current.volume = 0.3;
        }
    },[currentSong]);// eslint-disable-line react-hooks/exhaustive-deps

    // 切换歌曲时播放音乐
    useEffect(() => {
        isPlaying && audioRef.current.play();
    }, [isPlaying]);


    /***** 点击播放/暂停音乐 ****/
    function playMusic(){
        // 更改状态
        setIsPlaying(!isPlaying);
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }

    /***** 音乐播放时更新歌曲播放时间currentTime、slider进程 ****/
    function timeUpdate(e){
        let currentTime = e.target.currentTime;
        if(!isChanging){
            // console.log('音乐播放时更新歌曲播放时间currentTime、slider进程');
            setCurrentTime(currentTime*1000);
            setProgress(((currentTime * 1000) / duration) * 100);   
        }     
    }

    /***** 当前歌曲播放结束后 ****/
    function handleTimeEnd(){
        // 单曲循环
        if (playSequence === 2) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }else{
            // 播放下一首
            dispatch(changeCurrentIndexAndSongAction(1));
            setIsPlaying(false);
        }
    }

    /***** 滑动滑块时触发 ****/
    function sliderChange(value){
        // console.log('滑动滑块时更新currentTime、slider进程');
        setIsChanging(true);
        const currentTime = (value / 100) * duration;
        setCurrentTime(currentTime);
        setProgress(value);

    }
    /***** 手指抬起时触发 ****/
    function slideAfterChange(value){
        // console.log('手指抬起时更新audio的currentTime');
        setIsChanging(false);
        const currentTime = ((value / 100) * duration) / 1000;
        audioRef.current.currentTime = currentTime;
    }

    /***** 切换歌曲(点击播放下一首或上一首音乐) ****/
    function changeSong(tag){
        // 首先判断播放列表中是否存在音乐，再决定是否播放
        if (playListCount < 1) {
            return;
        }
        dispatch(changeCurrentIndexAndSongAction(tag));
        setIsPlaying(false); // 更改播放状态图标
    }

     /***** 更改播放顺序 ****/
     function changeSequence(){
        let currentSequence = playSequence;
        ++currentSequence;
        if (currentSequence > 2){
            currentSequence = 0;
        }
        // console.log();
        dispatch(changePlaySequenceAction(currentSequence));
     }


    
    return (
        <PlayerbarWrapper className='sprite_player'>
            <div className='content'>
                <Control isPlaying={isPlaying}>
                    <button className='sprite_player pre' onClick={()=>{changeSong(-1)}}></button>
                    <button className='sprite_player play' onClick={playMusic}></button>
                    <button className='sprite_player next' onClick={()=>{changeSong(1)}}></button>
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
                        <Slider
                            value={progress}
                            onChange={sliderChange}
                            onAfterChange={slideAfterChange}
                        />
                        <div className='song-time'>
                            <span className='now-time'>{formatDate(currentTime, 'mm:ss')}</span>
                            <span className='total-time'>
                                {' '}
                                / {duration && formatDate(duration, 'mm:ss')}
                            </span>
                        </div>
                    </div>
                </PlayerInfo>
                <Operator playSequence={playSequence}>
                    {/* 左侧暂时不实现 */}
                    <div className='left'></div>
                    <div className='right'>
                        <Tooltip title='调节音量'>
                            <button className='sprite_player btn volume'></button>
                        </Tooltip>
                        <Tooltip
                            title={['顺序播放','随机播放','单曲循环'].filter((item,index)=>(
                                index === playSequence?item:undefined
                            ))}
                        >
                            <button className='sprite_player btn loop' onClick={changeSequence}></button>
                        </Tooltip>
                        <Tooltip title='播放列表'>
                            <button className='sprite_player btn playlist'>
                                <span>{playListCount}</span>
                            </button>
                        </Tooltip>
                    </div>
                </Operator>
            </div>
            <audio
                id="audio"
                ref={audioRef}
                src={songPlayUrl}
                onTimeUpdate={timeUpdate}
                onEnded={handleTimeEnd}
            />
        </PlayerbarWrapper>
    );
}

export default AppPlayerBar;