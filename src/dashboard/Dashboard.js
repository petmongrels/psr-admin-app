import React, {useState} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import {serviceList} from "../service/ServiceList";

export function dashboard(props) {
    const {SubMenu} = Menu;
    const {Header, Content, Sider} = Layout;

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item key="sub1"><span><UserOutlined/>Services</span></Menu.Item>
                        <SubMenu key="sub2" title={<span><LaptopOutlined/>Master data</span>}>
                            <Menu.Item key="communication_mediums">Communication mediums</Menu.Item>
                            <Menu.Item key="photograph_types">Photograph types</Menu.Item>
                            <Menu.Item key="serving_entities">Serving entities</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >{serviceList(props)}</Content>
                </Layout>
            </Layout>
        </Layout>
    );
}