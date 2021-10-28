import TopBanners from './c-cpns/top-banners';
import {RecommendWrapper,RecommendLeft,RecommendRight,Content} from './style';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
import RecommendRanking from './c-cpns/recommend-ranking';



function Recommend(props){
    console.log('Recommend组件渲染');

    return (
        <RecommendWrapper className='recommend'>
            {/* 轮播图 */}
            <TopBanners/>
            {/* 主体内容 */}
            <Content>
                <RecommendLeft>
                    {/* 热门推荐 */}
                    <HotRecommend/>
                    {/* 新碟上架 */}
                    <NewAlbum/>
                    {/* 榜单 */}
                    <RecommendRanking/>
                    
                </RecommendLeft>
                <RecommendRight>

                </RecommendRight>
            </Content>
        </RecommendWrapper>
    );
}

export default Recommend;










// class Recommend extends Component{

//     render(){
//         console.log('渲染组件Recommend');
//         return (
//             <div className='recommend'>
//                 {/* <div>{this.props.topBanners.length}</div> */}
//                 <TopBanners/>
//             </div>
//         );
//     }

//     componentDidMount(){
//         console.log('Recommend组件挂载完成了');
//         // this.props.getTopBannersAction();
//     }


// }

// 从state中取数据映射到props上
// const mapStateToProps = (state) => ({
//     topBanners:state.recommend.topBanners
// })

// const mapDispatchToProps = (dispatch)=>(bindActionCreators({getTopBannersAction},dispatch))

// export default connect(mapStateToProps,mapDispatchToProps)(Recommend);

