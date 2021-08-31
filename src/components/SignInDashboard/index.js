import React from "react";
import { Wrapper, Content, Item } from "./SignInDashboard.styles";

const SignInDashboard = () => {
    return (
        <Wrapper>
            <Content>
                <Item>
                    <h2>Thông tin cá nhân</h2>
                </Item>
                {/* <Item>
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
                </Item> */}
            </Content>
        </Wrapper>
    );
};

export default SignInDashboard;
