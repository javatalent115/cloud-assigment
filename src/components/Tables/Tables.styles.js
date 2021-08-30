import styled from "styled-components";

export const Wrapper = styled.div`
    margin: 40px 0px;
`;
export const Content = styled.div`
    div {
        height: 500px;
        overflow: auto;
    }
    height: 600px;
    width: 1368px;
    border: 1px solid rgba(38, 56, 150, 0.1411764705882353);
    box-shadow: 0 4px 12px 0 rgb(34 41 47 / 12%);
    margin: 0 auto;
    border: 1px solid rgba(38, 56, 150, 0.1411764705882353);
    border-radius: 10px;
    padding: 24px;
    background-color: #fff;
    h5 {
        font-weight: bold;
        margin-bottom: 20px;
    }
    tbody,
    thead {
        text-align: center;
    }
    tbody td {
    }

    thead th {
        background: white;
        position: sticky;
        top: 0;
        border-top: 2px solid #dee2e6;
        border-bottom: 2px solid #dee2e6 !important;
    }
`;
