import { Layout } from 'antd';
import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from '../../routes';

const { Content } = Layout;

function ContentLayout() {
    return (
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
    );
}

export default ContentLayout;