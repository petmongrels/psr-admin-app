import {Button, List, Row, Card} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {PSRLayout} from "../framework/view/PSRLayout";
import PropTypes from 'prop-types';
import {APIService} from "../framework/api/APIService";

export function CommunicationMediumList(props) {
    const [commMediums, update] = useState([]);

    useEffect(() => {
        APIService.loadAll("/communication_medium").then((commMediums) => {
            update(commMediums);
        });
    });

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
                        <Card title={item.name}><a key="edit">edit</a></Card>
                    </List.Item>
                )}
            /></div>
    </PSRLayout>;
}

CommunicationMediumList.propTypes = {
    data: PropTypes.array.isRequired
};