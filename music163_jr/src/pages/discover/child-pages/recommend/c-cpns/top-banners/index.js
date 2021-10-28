import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getTopBannersAction } from '../../store/actionCreator'
import {BannerWrapper,BannerLeft,BannerRight,BannerControl} from './style';
import {Carousel} from 'antd';

function TopBanners(){
    // console.log('TopBanner组件渲染');

    // 组件内state
    const [currentIndex, setCurrentIndex] = useState(0)

    // redux Hook 组件和redux关联: 获取数据和进行操作
    const dispatch = useDispatch()
    const { topBanners } = useSelector(
        state => ({
            topBanners:state.recommend.topBanners
        }),
        shallowEqual
    )

    const bannerRef = useRef()

    useEffect(() => {
        // 在组件挂载之后发送网络请求
        console.log('topBanner发送网络请求');
        dispatch(getTopBannersAction())
    },[dispatch])

    
    const bgImage =
    topBanners &&
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + '?imageView&blur=40x20'

    return (
        <BannerWrapper bgImage={bgImage}>
            <div className='content'>
                <BannerLeft>
                    <Carousel
                        effect="fade"
                        autoplay={true}
                        ref={bannerRef}
                        beforeChange={(from, to) => {setCurrentIndex(to)}}
                    >
                        {topBanners && topBanners.map((item)=>(
                            <div key={item.imageUrl}>
                                <img src={item.imageUrl} alt={item.typeTitle}/>
                            </div>
                        ))}
                    </Carousel>
                </BannerLeft>
                <BannerRight/>
                <BannerControl>
                    <button className="btn" onClick={() => bannerRef.current.prev()}></button>
                    <button className="btn" onClick={() => bannerRef.current.next()}></button>
                </BannerControl>
            </div>
        </BannerWrapper>
    );
}

export default TopBanners;