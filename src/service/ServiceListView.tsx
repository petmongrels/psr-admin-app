import {Descriptions, List, Row, Button} from 'antd';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {PSRLayout} from "../framework/view/PSRLayout";
import {APIService} from "../framework/api/APIService";
import {ServerResources} from "../framework/routing/ServerResources";
import {Service} from "./model/Service";
import {AppResources} from "../framework/routing/AppResources";
import {ReferenceEntities} from "../framework/model/ReferenceEntity";
import {Link} from 'react-router-dom';

type ServiceListViewProps = {}

const getTitleLink = function (service: Service) {
    return <Link to={AppResources.getEditPath("service", service.id)}>{service.name}</Link>;
};

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
            renderItem={service => {
                const titleLink = getTitleLink(service);
                return <List.Item actions={[<Link to={AppResources.getEditPath("service", service.id)}>edit</Link>]}>
                    <List.Item.Meta
                        title={titleLink}
                        description={service.description}
                    />
                </List.Item>
            }}
        />
        <br/>
        <Row justify="end">
            <Button type="default" style={{alignSelf: 'end'}}>Add Service</Button>
        </Row>
    </PSRLayout>;
};