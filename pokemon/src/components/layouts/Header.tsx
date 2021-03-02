import React from 'react';
import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';
import { Avatar, Layout } from 'antd';
import './styles/headerStyles.scss';

const { Header } = Layout;

function HeaderLayout() {
    return (
        <Header style={{ padding: 10 }} className="header-layout">
            <Avatar style={{ float: 'right' }} src='./dp.png' />
            <Title style={{ color: 'white' }} level={3}>
                <Link to="/home-page">
                    POKEMON
                </Link>
            </Title>
        </Header>
    );
}

export default HeaderLayout;