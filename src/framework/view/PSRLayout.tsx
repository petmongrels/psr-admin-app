import React, {FunctionComponent} from 'react';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {MenuData} from "./MenuData";
import {Link} from 'react-router-dom';

type PSRLayoutProps = {
};

export const PSRLayout: FunctionComponent<PSRLayoutProps> = ({children}) => {
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
                        defaultSelectedKeys={MenuData.getInstance().getTopSelectedItemKeys()}
                        defaultOpenKeys={MenuData.getInstance().getTopOpenItemKeys()}
                        style={{height: '100%', borderRight: 0}}
                        onSelect={({selectedKeys}) => MenuData.getInstance().selectKeys(selectedKeys)}
                        onOpenChange={(openKeys) => MenuData.getInstance().setOpenKeys(openKeys)}
                    >
                        {MenuData.getInstance().getTopItems().map(menuItemData => {
                            if (menuItemData.children.length === 0)
                                return <Menu.Item key={menuItemData.key}>
                                        <Link to={menuItemData.url}><span><UserOutlined/>{menuItemData.text}</span></Link>
                                </Menu.Item>;
                            else {
                                return <SubMenu key={menuItemData.key} title={<span><LaptopOutlined/>{menuItemData.text}</span>}>
                                    {menuItemData.children.map(child => <Menu.Item key={child.key}>
                                        <Link to={child.url}>{child.text}</Link>
                                    </Menu.Item>)}}
                                </SubMenu>;
                            }
                        })}
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >{children}</Content>
                </Layout>
            </Layout>
        </Layout>
    );
};