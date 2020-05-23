import {Descriptions, List, Row, Button} from 'antd';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {PSRLayout} from "../framework/view/PSRLayout";
import {APIService} from "../framework/api/APIService";
import {ServerResources} from "../framework/routing/ServerResources";
import {Service} from "./model/Service";

type ServiceListViewProps = {}

export const ServiceListView: FunctionComponent<ServiceListViewProps> = ({}) => {
    const [services, update] = useState<Array<Service>>([]);

    useEffect(() => {
        APIService.loadAll(ServerResources.getResourceBaseURL("service")).then((data) => {
            update(data);
        });
    }, []);

    return <PSRLayout>
        <Descriptions title="All services"/>
        <List
            itemLayout="horizontal"
            dataSource={services}
            renderItem={service => (
                <List.Item actions={[<a key="edit">edit</a>]}>
                    <List.Item.Meta
                        title={<a href="https://ant.design">{service.name}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
        <br/>
        <Row justify="end">
            <Button type="default" style={{alignSelf: 'end'}}>Add Service</Button>
        </Row>
    </PSRLayout>;
};