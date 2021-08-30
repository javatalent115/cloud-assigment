import styled from "styled-components";

export const Wrapper = styled.div`
    background: linear-gradient(133deg, #ed1b23, #2e3091, #253494) !important;
    align-items: center;
    color: white;
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
`;

export const RightNavItem = styled.li`
    cursor: pointer;
    &::before {
        content: "${({ content }) => content}";
    }
    font-weight: bold;
    padding: 12px 0 12px 25px;
    align-items: center;
`;
