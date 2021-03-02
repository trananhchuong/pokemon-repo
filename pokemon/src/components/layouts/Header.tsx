import React from 'react';
import Title from 'antd/lib/typography/Title';


import { Avatar, Layout } from 'antd';

const { Header } = Layout;

function HeaderLayout() {
    return (
        <Header style={{ padding: 10 }}>
            <Avatar style={{ float: 'right' }} src='./dp.png' />
            <Title style={{ color: 'white' }} level={3}>POKEMON</Title>
        </Header>
    );
}

export default HeaderLayout;