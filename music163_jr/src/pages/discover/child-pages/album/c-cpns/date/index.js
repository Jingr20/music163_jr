import {DateWrapper} from './style';
import { parseTime } from '../../../../../../utils/format-utils';

function DateComponent(){
    const day = parseTime(new Date(), '{d}')
    let week = '星期' + '日一二三四五六'.charAt(new Date().getDay())

    return (
        <DateWrapper className='date'>
            <div className="head">{week}</div>
            <div className="day">{day}</div>
            <div className="mask date"></div>
        </DateWrapper>
    );
}

export default DateComponent;