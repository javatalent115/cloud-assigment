import styled from "styled-components";

export const Wrapper = styled.div`
    margin-top: 20px;
    height: fit-content;
    min-height: calc(100vh - 300px - 78px);
    img {
        width: 100px;
        padding: 0;
    }
    .progress-bar {
        background-color: red;
    }
    .btn-primary {
        background-color: #2d2188;
        border-color: #2d2188;
    }
    .btn-primary:hover {
        background-color: red;
    }
`;
export const Content = styled.div`
    .title {
        font-weight: bolder;
        font-size: 20px;
    }

    box-shadow: 0 10px 30px 0 rgb(38 57 52 / 15%);
    max-width: 1366px;
    margin: 0 auto;
    padding: 15px 10px;
    align-items: center;

    .row {
        margin: 20px 0px;
    }
`;

export const Item = styled.div`
    h5 {
        font-weight: bolder;
    }
`;
