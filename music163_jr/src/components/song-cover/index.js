import {SongCoverWrapper} from './style';

function SongCover(props){
    /*
    接口字段: 
    封面图片: picUrl
    播放数量: playCount
    封面名字: name
    封面底部文字: copywriter
    */
    const {info,width=140} = props;

    const picUrl = info && info.picUrl;
    const playCount = info && info.playCount;
    const name = info && info.name;
    // const copywriter= info && info.copywriter;
    const songInfoId = info && info.id;


    return (
        <SongCoverWrapper width={width} href={`#/songlist?songlistId=${songInfoId}`}>
            <div className='coverWrapper'>
                <img src={`${picUrl}?param=${width}x${width}`} alt=''/>
                <div className='bottom-bar sprite_cover'>
                    <span>
                        <i className='erji sprite_icon'></i>
                        {playCount}
                    </span>
                    <i className='play sprite_icon'></i>
                </div>
               
            </div>
            <div className='cover-title'>{name}</div>
            {/* <div className='cover-source'>
                by {copywriter}
            </div> */}

        </SongCoverWrapper>
    );
}

export default SongCover;
