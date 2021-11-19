import {Wrapper,DayRecommendContent} from './style';
import {useSelector,useDispatch} from 'react-redux';
import {useState,useEffect,useCallback} from 'react';
import DateComponent from './c-cpns/date';
import SongItem from './c-cpns/song-item';
import ThemeHeaderRmc from '@/components/theme-header';
import { getRecommendSong } from '../../../../service/song-recommend';
import { formatMinuteSecond } from '@/utils/format-utils.js';
import Authentication from '../../../../components/authentication'
import { changeIsVisible } from '@/components/theme-login/store/actionCreator'


function Album(props){

    // 获取store中的数据
    const {isLogin,cookie} = useSelector(state => ({
        isLogin:state.loginState.isLogin,
        cookie:state.loginState.cookie
    }));

    // 组件内状态
    const [recommendPlaylist, setRecommendPlaylist] = useState([]);

    // 获取推荐歌单列表
    useEffect(() => {
        cookie && getRecommendSong(cookie).then((res) => {
            const result = res.data
            setRecommendPlaylist(result.dailySongs)
            console.log(result.dailySongs);
        })
    }, [cookie])

    // 回退
    const toRedirect = useCallback(() => {
        console.log('props.history',props.history);
        props.history.push('/')
    }, [props.history])

    // 触发登录框
    const dispatch = useDispatch()
    const showModal = useCallback(() => {
        dispatch(changeIsVisible(true))
    }, [dispatch])


    return (
        <Wrapper>
            {/* 登录鉴权组件 */}
            <Authentication flag={isLogin} to={toRedirect} showModal={showModal} />
            <DayRecommendContent className='content' style={{display:isLogin?'block':"none"}}>
                {/* 日期组件 */}
                <div className='recommend-cover-bg'>
                    <DateComponent/>
                </div>
                {/* 推荐内容 */}
                <div className='main'>
                    {/* 标题 */}
                    <ThemeHeaderRmc
                        title="歌曲列表"
                        keywords={[`${recommendPlaylist.length}首歌`]}
                        right={''}
                        showIcon={false}
                    />
                    {/* 歌曲列表 */}
                    <div className="toplist-main">
                        <div className="main-header">
                            <div className="sprite_table header-item"></div>
                            <div className="sprite_table header-item header-title">歌曲标题</div>
                            <div className="sprite_table header-item header-time">时长</div>
                            <div className="sprite_table header-item header-singer">歌手</div>
                        </div>
                        <div className="main-list">
                            {recommendPlaylist && recommendPlaylist.map((item,index)=>{
                                return (
                                    <SongItem
                                        key={item.id}
                                        currentRanking={index+1}
                                        className="song_item"
                                        coverPic={index < 3?item.al.picUrl:''}
                                        duration={formatMinuteSecond(item.dt)}
                                        songName={item.name}
                                        singer={item.ar[0].name}
                                        songId={item.id}
                                    />
                                );
                            })}
                        </div>
                    </div>

                </div>
            </DayRecommendContent>
        </Wrapper>
    );
}

export default Album;