import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 980px;
    margin: 0 auto;
    border: solid 1px #d3d3d3;
`

export const DayRecommendContent = styled.div`
    .recommend-cover-bg{
        width: 900px;
        height: 179px;
        background: url(${require('@/assets/img/recommend-cover.jpg').default}) no-repeat;
        background-size: cover;
        margin: 20px auto;
    }

    .main{
        margin-top: 45px;
        padding: 0 30px;

        .toplist-main{
            border: 1px solid #d9d9d9;
            .main-header{
                display: flex;
                .header-item{
                    width: 74px;
                    height: 34px;
                    line-height: 18px;
                    padding: 8px 10px;
                    background-position: 0 0;
                    background-repeat: repeat-x;
                    background-color: #f2f2f2;
                    color: #666;

                    &:first-child {
                        border-right: 1px solid #dadada;
                    }
                    &.header-title {
                        width: 327px;
                        border-right: 1px solid #dadada;
                    }
                    &.header-singer {
                        width: 173px;
                    }
                    &.header-time {
                        width: 91px;
                        border-right: 1px solid #dadada;
                    }
          
                }
            }

            .main-list{
                
            }
        }
    }

`