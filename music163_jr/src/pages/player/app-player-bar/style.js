import styled from 'styled-components';

export const PlayerbarWrapper = styled.div`
    position: fixed;
    height: 53px;
    width: 100%;
    min-width: 980px;
    background-position: 0 0;
    background-repeat: repeat;
    bottom: 0;

    .content{
        display: flex;
        justify-content: space-between;
        width: 980px;
        height: 47px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
    }
`

export const Control = styled.div`
    display: flex;
    align-items: center;

    .pre,
    .play,
    .next{
        width: 28px;
        height: 28px;
        cursor: pointer;
        margin-right: 8px;
    }
    .pre{
        background-position: 0 -130px;
        &:hover {
            background-position: -30px -130px;
        }
    }
    .play{
        width: 36px;
        height: 36px;
        /* 动态的传递 */
        background-position: 0 ${props => (props.isPlaying ? '-165px' : '-204px')};

        &:hover {
            /* 动态的传递 */
            background-position: -40px
                ${props => (props.isPlaying ? '-165px' : '-204px')};
            }
    }
    .next{
        background-position: -80px -130px;

        &:hover {
            background-position: -110px -130px;
        }
    }

`

export const PlayerInfo = styled.div`
    display: flex;
    .image{
        width: 34px;
        height: 35px;
        border-radius: 5px;
        margin: 6px 15px 0 0;
        overflow: hidden;
    }
    .play-detail{
        .song-info{
            height: 28px;
            line-height: 28px;
            
            .song-name{
                color: #e8e8e8;
                margin: 0 10px;
            }
            .song-author{
                color: #9b9b9b;
            }
        }

        .ant-slider{
            float: left;
            width: 493px;
            height: 9px;
            margin-top: -2px;

            .ant-slider-rail,
            .ant-slider-track{
                height: 9px;
            }

            .ant-slider-rail{
                background: url(${require('@/assets/img/progress_bar.png').default}) 0 0;  
            }
            .ant-slider-track {
                background: url(${require('@/assets/img/progress_bar.png').default});
                background-position: 0 -66px;
            }
            .ant-slider-handle{
                width: 20px;
                height: 22px;
                background: url(${require('@/assets/img/sprite_icon.png').default});
                background-position: 0 -250px;
                border: 0;
                margin-top: -8px;
            }

        }

        .song-time{
            float: left;
            height: 28px;
            line-height: 28px;
            color: #a1a1a1;
            margin-top: -8px;
            margin-left: 10px;

            .total-time {
                color: #797979;
            }

        }
    }
`
export const Operator = styled.div`
    display: flex;

    .btn{
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .right{
        display: flex;
        align-items: center;
        width: 126px;
        padding-left: 13px;

        .volume{
            background-position: -2px -248px;
        }
        .loop{
            background-position: ${props => {
                switch (props.playSequence) {
                case 1:
                    return '-66px -248px;'
                case 2:
                    return '-66px -344px;'
                default:
                    return '-3px -344px;'
                }
            }};
        }
        .playlist{
            background-position: -42px -68px;
            width: 59px;
            padding-left: 18px;
            text-align: center;
            color: #ccc;
        }
    }
`

