import styled from 'styled-components';

export const RcmHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    height: 33px;
    line-height: 33px;
    border-bottom: 2px solid #c10d0c;
`

export const RcmHeaderLeft = styled.div`
    display: flex;
    .icon{
        display: inline-block;
        height: 33px;
        width: 33px;
        background-image: url(${require("@/assets/img/sprite_02.png").default});
        background-position: -225px -156px;
    }
    .title{
        a{
            color: #333333;
            &:hover {
                text-decoration: none;
            }
        }
    }
    li{
        padding: 0 20px;
        display: inline-block;
        border: 1px solid #d3d3d3;
        border-width:0 1px;
        border-left: 0;
        height: 15px;
        line-height: 15px;
    }
`

export const RcmHeaderRight = styled.div`
    padding-top:5px;
    display: flex;
    height: 25px;
    line-height: 25px;
    
    .icon{
        display: inline-block;
        height: 25px;
        width: 25px;
        background-image: url(${require("@/assets/img/sprite_02.png").default});
        background-position: 6px -234px;
    }
`