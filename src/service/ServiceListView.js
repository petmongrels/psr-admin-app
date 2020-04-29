import {Avatar, Button, List, Row} from 'antd';
import React from 'react';
import {Link} from "react-router-dom";
import {PSRLayout} from "../framework/view/PSRLayout";
import {AppResources} from "../framework/routing/AppResources";

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

export function ServiceListView(props) {
    return <PSRLayout>
        <div>
            <Row justify="end">
                <Button type="primary"><Link to={AppResources.getCreateURLFor("service")}>New Service</Link></Button>
            </Row>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[<a key="edit">edit</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            /></div>
    </PSRLayout>;
}