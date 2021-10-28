import {NavBarWrapper,CategoryList} from './style';
import {discoverMenu} from '@/common/local-data';
import {NavLink} from 'react-router-dom';

function NavBar(){
    return (
        <NavBarWrapper>
            <CategoryList>
                {
                    discoverMenu.map((item)=>(
                        <li key={item.title} className='item'>
                            <NavLink to={item.link} activeClassName='item-active'>
                                {item.title}
                            </NavLink>
                        </li>
                    ))
                }
            </CategoryList>
        </NavBarWrapper>
    );
}

export default NavBar;