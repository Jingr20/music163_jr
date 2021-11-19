import styled from 'styled-components';

export const LoginWrapper = styled.div`
    display: flex;

`;

export const LoginLeft = styled.div`
    width: 250px;
    .login-content{
        border-right: 1px dotted #ccc;
        height: 220px;
        .login-bg{
            width: 250px;
            height: 140px;
            background: url(${require('@/assets/img/platform.png').default}) no-repeat center;
        }
        .btn{
            display: block;
            margin-top: 10px;
            width: 220px;
            margin-left: 8px;
        }
    }

`;

export const LoginRight = styled.div`
    padding: 3px 0 3px 30px;
    margin-top: -15px;
`;

export const PhoneLoginModal = styled.div`
    display: flex;
    justify-content: center;
`;