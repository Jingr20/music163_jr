import styled from 'styled-components';

// 控制header局部样式
export const HeaderWrapper = styled.div`
    width: 100%;
    min-width: 1100px;
    background-color: #242424;


    .content{
        display: flex;
        justify-content: space-between;
        color: #fff;
        /* 定款居中 */
        width: 1100px;
        margin: 0 auto;

    }

    .redline{
        height: 5px;
        background-color: #c20b0b;
    }
`

export const HeaderLeft = styled.div`
    display: flex;

    .logo {
        display: inline-block;
        width: 176px;
        height: 69px;
        background-position: 0 0;
    }
    
    .header-group{
        display: flex;
        .header-item{
            color: #ccc;
            font-size: 14px;
            text-align: center;
            height: 69px;
            line-height: 69px;
            padding: 0 20px;
            position: relative;

            /* 鼠标悬浮背景高亮 */
            &:hover{
                text-decoration: none;
                background-color: #000;
            }

            /* hot图标 */
            :last-of-type{
                position: relative;
                ::after{
                    /* 添加伪元素 */
                    position: absolute;
                    content: '';
                    width: 28px;
                    height: 19px;
                    background-image: url(${require("@/assets/img/sprite_01.png").default});
                    background-position: -192px 0;
                    top: 20px;
                    right: -10px;
                }
            }
        }

        /* NavLink活跃状态 */
        .link-active{
            color: #fff;
            background-color: #000;
            /* 下面的小三角 */
            .icon{
                position: absolute;
                width: 12px;
                height: 7px;
                bottom: -1px;
                left: 50%;
                transform: translate(-50%, 0);
                background-image: url('${require('@/assets/img/sprite_01.png').default}');
                background-position: 254px 0;
            }
        }
    }
`

export const HeaderRight = styled.div`
    display: flex;
    align-items:center;
    color: #ccc;

    .search-wrapper {
        position: relative;

        // 搜索框
        .search{
            width: 221px;
            height: 32px;
            border-radius: 16px;

            input{
                font-size: 14px;
                font-family: '微软雅黑';
                &::placeholder {
                    font-size: 12px;
                }
            }
        }

        // 下拉框
        .down-slider {
            position: absolute;
            top: 36px;
            left: 0;
            right: 0;
            width: 237px;
            z-index: 999;
            border: 1px solid #bebebe;
            border-radius: 4px;
            background: #fff;
            box-shadow: 0 4px 7px #555;
            text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);

            .search-header {
                height: 35px;
                .discover {
                    display: inline-block;
                    padding-top: 10px;
                    padding-left: 10px;
                }
            }

            .content {
                display: flex;
                width: 235px;
                border: 1px solid rgb(183, 183, 187);

                .zuo {
                    width: 50px;
                    padding-top: 10px;
                    .song {
                        color: #ccc;
                        margin-left: 18px;
                    }
                }

                .main {
                    display: inline-block;
                    font-size: 13px;

                    .item {
                        width: 178px;
                        height: 35px;
                        line-height: 35px;
                        cursor: pointer;
                        
                        color: #000;
                        text-indent: 8px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                       
                        &:hover {
                            background-color: #ecf0f1;
                            border-radius: 5%;
                        }

                        &.active {
                            background-color: #ecf0f1;
                            color: #2ecc71;
                        }
                    }
                }
            }
        }
    }

    .center{
        width: 75px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #666;
        border-radius: 16px;
        margin: 0 13px;
        background-color: transparent;

        &:hover {
            cursor: pointer;
            border-color: #fff;
            color: #fff;
        }
    }

    .login:hover {
        cursor: pointer;
        text-decoration: underline;
    }
    
`