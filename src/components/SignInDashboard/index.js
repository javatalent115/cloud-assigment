import React from "react";
import { Wrapper, Content, Item } from "./SignInDashboard.styles";

const SignInDashboard = () => {
    return (
        <Wrapper>
            <Content>
                <Item>
                    <p>Bước 1</p>
                    <h5>Thông tin cá nhân</h5>
                </Item>
                <Item>
                    <p>Bước 2</p>
                    <h5>Tiền sử bệnh</h5>
                </Item>
                <Item>
                    <p>Bước 3</p>
                    <h5>Phiếu đồng ý tiêm</h5>
                </Item>
                <Item>
                    <p>Bước 4</p>
                    <h5>Hoàn thành</h5>
                </Item>
            </Content>
        </Wrapper>
    );
};

export default SignInDashboard;
