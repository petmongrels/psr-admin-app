import {Button, List, Row, Card} from 'antd';
import React, {useEffect, useState, FunctionComponent} from 'react';
import {Link} from "react-router-dom";
import {PSRLayout} from "../framework/view/PSRLayout";
import {APIService} from "../framework/api/APIService";

type CommunicationMediumListProps = {
};

export const CommunicationMediumListView: FunctionComponent<CommunicationMediumListProps> = ({children}) => {
    const [commMediums, update] = useState([]);

    useEffect(() => {
        APIService.loadAll("/communication_medium").then((data) => {
            update(data);
        });
    }, []);

    return <PSRLayout>
        <div>
            <Row justify="end">
                <Button type="primary"><Link to="/communicationMedium/new">New Communication Medium</Link></Button>
            </Row>
            <List
                itemLayout="horizontal"
                dataSource={commMediums}
                renderItem={item => (
                    <List.Item>
                        <Card title={item["name"]}><a key="edit">edit</a></Card>
                    </List.Item>
                )}
            /></div>
    </PSRLayout>;
};