import {renderRoutes} from 'react-router-config';
import NavBar from 'components/nav-bar';

function Discover(props){
    return (
        <div className='discover'>
            <NavBar />
            {renderRoutes(props.route.routes)}
        </div>
    );
}

export default Discover;