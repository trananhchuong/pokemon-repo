import { Layout } from 'antd';
import React from 'react';
import ContentLayout from './Content';
import HeaderLayout from './Header';

function LayoutApp() {
    return (
        <div className="App">
            <Layout>
                <HeaderLayout />
                <ContentLayout/>
            </Layout>
        </div>
    );
}

export default LayoutApp;

