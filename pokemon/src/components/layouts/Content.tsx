import React from 'react';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { MailOutlined } from '@ant-design/icons';
import { Link, Route } from 'react-router-dom';
import { Routes } from '../../routes';
import FooterLayout from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import _ from 'lodash';
import Loading from '../loading/Loading';
import AppUtil from '../../Utils/AppUtil';

import productApi from '../../api/generationsApi';
import versionsApi from '../../api/versionsApi';
import { SetDataMenu } from '../../actions';

const { Sider, Content } = Layout;

function ContentLayout() {
    const dispatch = useDispatch();
    const pokemonData = useSelector((state: RootState) => {
        return state.dataPokemon;
    });

    const { gameVersion, generations } = pokemonData;
    console.log("🚀 ~ file: Content.tsx ~ line 27 ~ ContentLayout ~ pokemonData", pokemonData)

    const checkLoadData = _.size(gameVersion) === 0 || _.size(generations) === 0;
    console.log("🚀 ~ file: Content.tsx ~ line 30 ~ ContentLayout ~ checkLoadData", checkLoadData)

    const getDataMenu = async () => {
        try {
            const versionParams = {
                limit: 1000 //get all version
            };

            const reponseData = await AppUtil.Axios.all([
                productApi.getListAll(),
                versionsApi.getListAll(versionParams)
            ]);
            const generationsRes = _.get(reponseData[0], "results", []);
            const gameVersionRes = _.get(reponseData[1], "results", []);

            dispatch(SetDataMenu({ generations: generationsRes, gameVersion: gameVersionRes }));

        } catch (error) {
            console.log("🚀 ~ file: Content.tsx ~ line 91 ~ getDataMenu ~ error", error)
        }
    }

    if (checkLoadData) {
        getDataMenu();
        return <Loading />;
    }

    return (
        <Layout>
            <Sider collapsed={false}>
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
                    <Menu.Item key='Items'>
                        <Link to="/items">
                            Items
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
                <FooterLayout />
            </Layout>
        </Layout>
    );
}

export default ContentLayout;