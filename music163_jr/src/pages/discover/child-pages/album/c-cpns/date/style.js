import styled from 'styled-components';

export const DateWrapper = styled.div`
    width: 120px;
    height: 120px;
    background-position: 0 -270px;
    position: relative;
    margin: 34px 0 0 54px;

    .head{
        height: 26px;
        line-height: 26px;
        color: #fed9d9;
        font-size: 14px;
        text-shadow: 0 -1px #962626;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
    }
    .day{
        width: 110px;
        line-height: 95px;
        font-size: 74px;
        font-weight: bold;
        color: #202020;
        text-align: center;
    }
    .mask{
        background-position: 0 -400px;
        position: absolute;
        top: 33px;
        left: 0;
        width: 120px;
        height: 107px;
    }
`