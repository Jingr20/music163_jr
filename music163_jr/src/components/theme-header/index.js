import {RcmHeaderWrapper,RcmHeaderLeft,RcmHeaderRight} from './style';
import propTypes from 'prop-types';

function ThemeHeaderRmc(props){

    return (
        <RcmHeaderWrapper>
            <RcmHeaderLeft>
                <span className='icon'></span>
                <h2 className='title'>
                    <a href={props.link}>
                        {props.title}
                    </a>
                </h2>
                <ul>
                    {
                        props.keywords &&
                        props.keywords.map((item,index)=>(
                            <li key={index}>
                                <a href={props.link}>{item}</a>
                            </li>
                        ))
                    }
                </ul>
            </RcmHeaderLeft>
            <RcmHeaderRight>
                <a href={props.link}>{props.right}</a>
                {props.showIcon && <span className='icon'></span>}
            </RcmHeaderRight>
        </RcmHeaderWrapper>
    );
}

ThemeHeaderRmc.propTypes = {
    // title属性必填
    title: propTypes.string.isRequired,
    keywords: propTypes.array,
    link: propTypes.string,
    right: propTypes.any,
    showIcon: propTypes.bool
}

ThemeHeaderRmc.defaultProps = {
    keywords: [],
    link:null,
    right: '更多',
    showIcon: true
}

export default ThemeHeaderRmc;