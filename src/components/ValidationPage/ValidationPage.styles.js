import styled from "styled-components";

export const Wrapper = styled.div`
    margin-top: 20px;
    min-height: calc(100vh - 300px - 78px);

    display: flex;
`;
export const Content = styled.div`
    max-width: 1366px;
    width: 925px;
    margin: 0 auto;
    padding: 35px 25px;
    align-items: center;
    margin: 0 auto;
    box-shadow: 0 10px 30px 0 rgb(38 57 52 / 15%);

    .row {
        justify-content: center;
    }
    img {
        width: 400px;
    }
    h3 {
        text-align: center;
        font-size: 35px;
    }
    .btn {
        width: 30%;
        height: 50px;
    }
    .btn-check:focus + .btn-primary,
    .btn-primary:focus {
        background-color: red !important;
        border-color: red !important;
    }
`;
