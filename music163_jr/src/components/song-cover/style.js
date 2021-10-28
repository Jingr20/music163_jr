import styled from 'styled-components'

export const SongCoverWrapper = styled.a`
    display: inline-block;
    width: ${props => props.width+'px'};
    margin: 20px 0 20px 0;
    .coverWrapper{
        width: 140px;
        height: 140px;
        position: relative;
        .bottom-bar {
            position: absolute;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            left: 0;
            right: 0;
            bottom: 0;
            height: 27px;
            background-position: 0 -537px;
            color: #ccc;

            .erji {
                margin-right: 5px;
                display: inline-block;
                width: 14px;
                height: 11px;
                background-position: 0 -24px;
            }

            .play {
                display: inline-block;
                width: 16px;
                height: 17px;
                background-position: 0 0;
            }
        }
    }

    .cover-title{
        font-size: 14px;
        color: #000;
        margin-top: 5px;
    }

    .cover-source{
        color: #666;
    }

    
    
    
`