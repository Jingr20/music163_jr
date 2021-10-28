import { HotRecommendWrapper } from './style';
import ThemeHeaderRmc from '@/components/theme-header';
import {useEffect} from 'react';
import {useSelector,useDispatch,shallowEqual} from 'react-redux'
import {getHotRecommendAction} from '../../store/actionCreator'
import SongCover from 'components/song-cover';

function HotRecommend(){
    // console.log('HotRecommend组件渲染');

    // 从store中获取数据
    const {hotRecommend} = useSelector(state => ({
        hotRecommend:state.recommend.hotRecommend
    }),shallowEqual)

    const dispatch = useDispatch();
    // 网络请求数据
    useEffect(() => {
        console.log('HotRecommend组件发送网络请求');
        dispatch(getHotRecommendAction());
    }, [dispatch])

    return (
        <HotRecommendWrapper>
            <ThemeHeaderRmc 
                title="热门推荐"
                keywords={['华语', '流行', '摇滚', '民谣', '电子']}
            />
            <div className="recommend-list">
                {
                    hotRecommend &&
                    hotRecommend.map((item) => (
                        <SongCover key={item.id} info={item} className='item'/>
                    ))
                }
            </div>
        </HotRecommendWrapper>
    );
}

export default HotRecommend;