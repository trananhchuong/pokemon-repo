import React from 'react';
import Title from 'antd/lib/typography/Title';
import { Link } from 'react-router-dom';
import { Avatar, Layout, Tooltip } from 'antd';
import './styles/headerStyles.scss';
import { IMAGES_DEFAULT } from '../../constant/ImageConstanst';

const { Header } = Layout;

function HeaderLayout() {
    return (
        <Header style={{ padding: 10 }} className="header-layout">
            <Avatar style={{ float: 'right', background: "#fff" }} src={IMAGES_DEFAULT.imgDefault} />
            <Title style={{ color: 'white' }} level={3}>
                <Link to="/home-page">
                    <Tooltip title="Home Page">
                        POKEMON
                    </Tooltip>
                </Link>
            </Title>
        </Header>
    );
}

export default HeaderLayout;