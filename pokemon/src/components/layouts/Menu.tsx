import {
    DesktopOutlined,
    PieChartOutlined,


    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SetDataMenu } from '../../actions';
import productApi from '../../api/generationsApi';
import versionsApi from '../../api/versionsApi';
import { RootState } from '../../reducers';
import AppUtil from '../../Utils/AppUtil';
import Loading from '../loading/Loading';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MenuLayout() {

    const dispatch = useDispatch();
    const pokemonData = useSelector((state: RootState) => {
        return state.dataPokemon;
    });

    const { gameVersion, generations } = pokemonData;
    const checkLoadData = _.size(gameVersion) === 0 || _.size(generations) === 0;

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

    const renderChildrenMenu = (gameVersion: any) => {
        try {
            return _.map(gameVersion, (item) => {
                const name = _.get(item, 'name', '');
                const url = _.get(item, 'url', '');

                return <Menu.Item key={url}>{name}</Menu.Item>;
            })

        } catch (error) {
            console.log("🚀 ~ file: Content.tsx ~ line 111 ~ renderChildrenMenu ~ error", error)
        }
    }

    if (checkLoadData) {
        getDataMenu();
        return <Loading />;
    }

    return (
        <Sider collapsed>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['Games']} mode="inline">
                <SubMenu key="Games" icon={<UserOutlined />} title="Games">
                    {renderChildrenMenu(gameVersion)}
                </SubMenu>
                <SubMenu key="Generations" icon={<UserOutlined />} title="Generations">
                    {renderChildrenMenu(generations)}
                </SubMenu>
                <Menu.Item key="Locations" icon={<PieChartOutlined />}>
                    <Link to="/Locations">
                        Locations
                        </Link>
                </Menu.Item>
                <Menu.Item key="Items" icon={<DesktopOutlined />}>
                    <Link to="/items">
                        Items
                        </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default MenuLayout;