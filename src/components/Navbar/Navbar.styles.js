import styled from "styled-components";

export const Wrapper = styled.div`
    background: linear-gradient(133deg, #ed1b23, #2e3091, #253494) !important;
    align-items: center;
    color: white;
    .dropdown-menu {
        inset: 12px auto auto 0px !important;
    }
    justify-content: center;
`;

export const Content = styled.div`
    display: flex;
    max-width: 1366px;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 15px 10px;
`;
export const LeftNavItem = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 60px;
        padding: 0 10px;
    }
    &::after {
        content: "${({ content }) => content}";
    }
    font-size: 18pt;
    font-weight: 700;
    margin-right: auto;
`;
export const RightNav = styled.ul`
    margin: 0;
    display: flex;
    list-style: none;
    a {
        text-decoration: none;
        color: white;
    }

    .account {
        display: flex;
        align-items: center;
        .btn {
            background-color: #263394;
            border-color: #263394;
        }
        li:hover {
            background-color: lightgray;
        }
        * {
            margin: 0 5px;
        }
    }
    .image {
        padding: 0px !important;
        width: 35px;
        background-color: white;
        border-radius: 50%;
        cursor: pointer;
    }
`;

export const RightNavItem = styled.li`
    cursor: pointer;
    font-weight: bold;
    padding: 12px 25px 12px 25px;
    align-items: center;
`;
