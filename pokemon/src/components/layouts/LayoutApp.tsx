import React, { useState } from 'react';
import ContentLayout from './Content';
import HeaderLayout from './Header';
import MenuLayout from './Menu';
// import { Layout } from 'antd';
import { Routes } from '../../routes';
import { Link, Route } from 'react-router-dom';


import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { truncate } from 'lodash';
import FooterLayout from './Footer';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function LayoutApp() {
    // return (
    //     // <Layout style={{ minHeight: '100vh' }}>
    //     //     <HeaderLayout />
    //     //     <ContentLayout />
    //     // </Layout>
    //     <Layout style={{ minHeight: '100vh' }}>
    //         <MenuLayout />
    //         <Layout className="site-layout">
    //             <Header className="site-layout-background" style={{ padding: 0 }} />
    //             <Content style={{ margin: '0 16px' }}>
    //                 <Breadcrumb style={{ margin: '16px 0' }}>
    //                     <Breadcrumb.Item>User</Breadcrumb.Item>
    //                     <Breadcrumb.Item>Bill</Breadcrumb.Item>
    //                 </Breadcrumb>
    //                 <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
    //                     Bill is a cat.
    //         </div>
    //             </Content>

    //             {/* <Content style={{ margin: '0 16px' }}>
    //                 <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
    //                     {
    //                         Routes.map((route) => {
    //                             const { id, component: Component, exact } = route;
    //                             return (
    //                                 <Route
    //                                     key={id}
    //                                     exact={exact}
    //                                     path={id}
    //                                     render={
    //                                         (routeProps: any) => (
    //                                             <Component {...routeProps} />
    //                                         )
    //                                     }
    //                                 />
    //                             );
    //                         })
    //                     }
    //                 </div>

    //             </Content> */}
    //             <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    //         </Layout>
    //     </Layout>
    // );
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <MenuLayout />
            <Layout className="site-layout">
                <HeaderLayout />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {
                            Routes.map((route) => {
                                const { id, component: Component, exact } = route;
                                return (
                                    <Route
                                        key={id}
                                        exact={exact}
                                        path={id}
                                        render={
                                            (routeProps: any) => (
                                                <Component {...routeProps} />
                                            )
                                        }
                                    />
                                );
                            })
                        }
                    </div>
                </Content>
                <FooterLayout />
            </Layout>
        </Layout>
    );
}

export default LayoutApp;

