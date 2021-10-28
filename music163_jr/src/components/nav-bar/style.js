import styled from 'styled-components';

export const NavBarWrapper = styled.div`
    width: 100%;
    min-width: 1100px;
    height: 35px;
    background-color: #c20c0c;
`

export const CategoryList = styled.ul`
    width: 1100px;
    margin: 0 auto;
    display: flex;
    padding-left: 180px;

    .item{
        height: 35px;
        padding: 0 18px;
        a {
            display: inline-block;
            color: #fff;
            border-radius: 14px;
            padding: 3px 14px;
            margin-top: 4px;
            &:hover,
            &.item-active {
                text-decoration: none;
                background-color: #9b0909;
            }
        }
    }
`