import styled from "styled-components";
export const Wrapper = styled.div`
    margin: 20px 0px;
`;
export const Content = styled.div`
    display: flex;
    max-width: 1366px;
    margin: 0 auto;
    box-shadow: 0 10px 30px 0 rgb(38 57 52 / 15%);
    justify-content: space-between;
`;

export const Item = styled.div`
    background-color: #f8f9fa !important;
    align-items: center;
    flex-grow: 1;
    padding: 5px 15px;
    border-right: 1px solid #dee2e6;
    color: rgba(0, 0, 0, 0.5) !important;

    p {
        margin-bottom: 3px;
    }
    h5 {
        font-weight: bolder;
    }
`;
