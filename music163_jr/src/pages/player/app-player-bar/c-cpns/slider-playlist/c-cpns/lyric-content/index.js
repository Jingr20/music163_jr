import {LyricContentWrapper} from './style';
import {useRef,useEffect} from 'react';
import {useSelector,shallowEqual} from 'react-redux';
import { scrollTo } from '@/utils/ui-helper'

function LyricContent(){

    // 获取store中的数据
    const { lyricList, currentLyricIndex } = useSelector(state => ({
        lyricList:state.player.lyricList,
        currentLyricIndex:state.player.currentLyricIndex
    }),shallowEqual)

    const panelRef = useRef();

    // 让歌词显示在可视范围内
    useEffect(() => {
        if (currentLyricIndex > 0 && currentLyricIndex < 3) return;
        scrollTo(panelRef.current, (currentLyricIndex - 3) * 32, 300) // 行高32px,保持在第四行的位置
    }, [currentLyricIndex])

    return (
        <LyricContentWrapper ref={panelRef}>
            <div className="lyric-content">
                {lyricList && lyricList.map((item,index)=>{
                    return (
                        <div key={index} className={'lyric-item ' + (currentLyricIndex === index ? 'active' : '')}>
                            {item.content}
                        </div>
                    )
                })}
            </div>
        </LyricContentWrapper>
    );
}

export default LyricContent;