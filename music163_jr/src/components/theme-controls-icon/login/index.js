import propType from 'prop-types';

function LoginIcon(props){
    const {position,description,onClick} = props;

    return (
        <a href='/#' style={{display: 'flex', width: '149px', marginTop: '19px', lineHeight: '38px'}} onClick={onClick}>
            <i className='theme-logo' style={{width: '38px', height: '38px', backgroundPosition: position}}></i>
            <em style={{marginLeft: '14px'}}>{description}</em>
        </a>
    );
}

LoginIcon.propType = {
    position: propType.string.isRequired,
    description:propType.string.isRequired,
    onClick:propType.func
}

LoginIcon.defaultProptype = {
    position: '-150px -670px',
    description: 'deault'
}
export default LoginIcon;