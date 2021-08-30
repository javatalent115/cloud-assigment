import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #f7fbfe;
    margin: 20px 0px;
    box-shadow: 0 10px 30px 0 rgb(38 57 52 / 15%);
`;
export const Content = styled.div`
    background-color: white;
    display: flex;
    max-width: 1366px;
    margin: 0 auto;
`;

export const Item = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    border-right: 1px solid #dee2e6;
    font-weight: bold;
    font-size: 1.75rem;

    img {
        width: 30px;
        margin-right: 10px;
    }
    h6 {
        font-weight: bold;
        padding: 0;
        margin: 0;
    }
    small {
        font-size: 10pt;
    }
`;
