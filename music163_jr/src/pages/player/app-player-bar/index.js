import {PlayerbarWrapper,PlayerInfo,Control,Operator} from './style';
import {Slider,Tooltip, message} from 'antd';
import {useDispatch,useSelector,shallowEqual} from 'react-redux';
import {useEffect,useState,useRef} from 'react';
import {getSongDetailAction,
        getSongPlayUrlAction,
        changePlaySequenceAction,
        changeCurrentIndexAndSongAction,
        changeCurrentLyricIndexAction,
        changeIsPlayingAction} from '../store/actionCreator';
import {getSizeImage, formatDate} from '@/utils/format-utils.js';
import SliderPlaylist from './c-cpns/slider-playlist';

function AppPlayerBar(){
    // console.log('AppPlayerBar组件渲染');

    // 获取store中的数据
    const {
        currentSong,
        currentSongPlayUrl,
        playSequence,
        playListCount,
        lyricList,
        currentLyricIndex,
        isPlaying
            } = useSelector((state)=>({
        currentSong: state.player.currentSong,
        currentSongPlayUrl: state.player.currentSongPlayUrl,
        playSequence:state.player.playSequence,
        playListCount:state.player.playListCount,
        lyricList:state.player.lyricList,
        currentLyricIndex:state.player.currentLyricIndex,
        isPlaying:state.player.isPlaying
    }),shallowEqual); 

    // 组件内state
    // const [isPlaying,setIsPlaying] = useState(false); // 是否正在播放
    const [currentTime,setCurrentTime] = useState(0);  // 当前播放的时间
    const [progress,setProgress] = useState(0);  // 滑动条进度
    const [isChanging, setIsChanging] = useState(false); // 是否正在滑动
    const [isShowSlide, setIsShowSlide] = useState(false); // 是否显示播放列表


    //发送网络请求，请求歌曲详情
    const dispatch = useDispatch();
    useEffect(()=>{
        // console.log('请求歌曲详情');
        dispatch(getSongDetailAction(167860));
    },[]); // eslint-disable-line react-hooks/exhaustive-deps


    // 判断当前是否拿到currentSong的数据（第一次渲染还未拿到异步数据）
    const picUrl = currentSong&&currentSong.al && currentSong.al.picUrl; // 图片url
    const songName = currentSong&&currentSong.name; // 歌曲名字
    const singerName = currentSong&&currentSong.ar && currentSong.ar[0].name; //作者名字
    const duration = currentSong&&currentSong.dt; //播放总时间
    const songPlayUrl = currentSong&&currentSongPlayUrl && currentSongPlayUrl.url; //音乐播放URL
    
    // 利用ref获取DOM元素
    const audioRef = useRef();


    /***** 设置音频src ****/
    useEffect(()=>{
        // console.log('设置音频******');
        if(currentSong&&currentSong.id){
            dispatch(getSongPlayUrlAction(currentSong.id));
            // 设置音量
            audioRef.current.volume = 0.3;
        }
    },[currentSong]);// eslint-disable-line react-hooks/exhaustive-deps

    // 切换歌曲时播放音乐
    useEffect(() => {
        // 设置<audio>自动播放，当 播放状态isPlaying 和 歌曲播放源改变 时触发，判断控制播放
        if(isPlaying) audioRef.current.play();
        else {
            audioRef.current.pause();
            message.destroy('lyric');
        }
    }, [isPlaying,currentSongPlayUrl]);


    /***** 点击播放/暂停音乐 ****/
    function playMusic(){
        // 更改状态
        dispatch(changeIsPlayingAction(!isPlaying))
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

        // 获取当前播放歌词
        let i = 0; //用于获取歌词的索引
        for (; i < lyricList.length; i++){
            if (currentTime * 1000 < lyricList[i].totalTime) {
                break;
            }
        }
        // 如果index没有改变,就不进行dispatch(对dispatch进行优化)
        if (currentLyricIndex !== i - 1) {
            dispatch(changeCurrentLyricIndexAction(i - 1));
        }
        
        // 展示歌词
        const lyricContent = lyricList[i - 1] && lyricList[i - 1].content;
        lyricContent && isPlaying &&
        message.open({
            key: 'lyric',
            content: lyricContent,
            duration: 0,
            className: 'lyric-css',
        });
        isShowSlide && message.destroy('lyric');
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
            // setIsPlaying(false);
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
                            tipFormatter={null}
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
                        <button className='sprite_player btn playlist' onClick={() => setIsShowSlide(!isShowSlide)}>
                            <Tooltip title='播放列表'>
                                <span>{playListCount}</span>
                            </Tooltip>
                            <SliderPlaylist
                                isShowSlider={isShowSlide} 
                                playlistCount={playListCount}
                                closeWindow={()=>{setIsShowSlide(!isShowSlide)}}
                                // playMusic={()=>{setIsPlaying(true + Math.random())}}
                                // playMusic={()=>{setIsPlaying(false)}}
                                changeSong={changeSong}
                                isPlaying={isPlaying}
                            />
                        </button>
                    </div>
                </Operator>
            </div>
            <audio
                id="audio"
                ref={audioRef}
                src={songPlayUrl}
                onTimeUpdate={timeUpdate}
                onEnded={handleTimeEnd}
                autoPlay={true}
            />
        </PlayerbarWrapper>
    );
}

export default AppPlayerBar;