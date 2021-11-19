import styled from 'styled-components';

export const BannerWrapper = styled.div`
    width: 100%;
    min-width: 980px;
    height: 270px;
    /* background-color: pink; */
    background: url('${props => props.bgImage}') center center/6000px;
    
    .content{
        width: 980px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        position: relative;
    }
`

export const BannerLeft = styled.div`
    width: 730px;
    height: 270px;
    /* background-color: gray; */
    img{
        width: 100%;
    }
`

export const BannerRight = styled.a.attrs({
    href: 'https://d1.music.126.net/dmusic/cloudmusicsetup2.8.0.198822.exe',
    // href: 'https://music.163.com/#/download',
    target: '_blank',
})`
    width: 250px;
    height: 270px;
    /* background-color: green; */
    background: url(${require('@/assets/img/download.png').default});
`
export const BannerControl = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 63px;
    
    .btn{
        width: 37px;
        height: 63px;
        background-image: url(${require("@/assets/img/banner_sprite.png").default});
        background-color: transparent;
        cursor: pointer;
        position: absolute;

        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
        &:nth-child(1) {
            left: -68px;
            background-position: 0 -360px;
        }
        &:nth-child(2) {
            right: -68px;
            background-position: 0 -508px;
        }

    }
    .slick-dots{
        z-index: 0;
    }
`


