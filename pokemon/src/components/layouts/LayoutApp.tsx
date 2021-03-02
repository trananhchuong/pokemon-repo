import { MailOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Button, message } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { RootState } from '../../reducers';
import { Routes } from '../../routes';
import { logoutApi } from '../../constant/ApiConstant';
import _ from 'lodash';

const { Header, Footer, Sider, Content } = Layout;

function LayoutApp() {

    


    return (
        <div className="App">
            <Layout>
                <Header style={{ padding: 10 }}>
                    <Avatar style={{ float: 'right' }} src='./dp.png' />
                    <Title style={{ color: 'white' }} level={3}>POKEMON</Title>
                </Header>
                <Layout>
                    <Sider
                        collapsed={false}
                    >
                        <Menu
                            defaultSelectedKeys={['Dashboard']}
                            mode="inline"
                        >
                            <SubMenu
                                icon={<MailOutlined />}
                                title={
                                    <span>Games</span>
                                }
                            >
                                <Menu.Item key='location1'> Game Version</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                icon={<MailOutlined />}
                                title={
                                    <span>Generations</span>
                                }
                            >
                                <Menu.Item key='location2'> All Generation</Menu.Item>
                            </SubMenu>
                            <Menu.Item key='Locations'>
                                <Link to="/generations">
                                    Locations
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{ padding: '0 50px' }}>
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
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Pokemon Demo Created by Chuong Tran</Footer>
                    </Layout>

                </Layout>
            </Layout>
        </div>
    );
}

export default LayoutApp;

