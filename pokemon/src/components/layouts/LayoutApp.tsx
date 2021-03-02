import { Layout } from 'antd';
import React from 'react';
import ContentLayout from './Content';
import FooterLayout from './Footer';
import HeaderLayout from './Header';
import MenuLayout from './Menu';

function LayoutApp() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MenuLayout />
            <Layout className="site-layout">
                <HeaderLayout />
                <ContentLayout/>
                <FooterLayout />
            </Layout>
        </Layout>
    );
}

export default LayoutApp;

