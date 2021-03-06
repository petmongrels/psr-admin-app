import {Button, Col, Descriptions, List, Row} from 'antd';
import React, {FunctionComponent, useState, useEffect} from 'react';
import {AppResources} from "../../framework/routing/AppResources";
import {Link} from 'react-router-dom';
import {ReferenceEntities, ReferenceEntity} from "../../framework/model/ReferenceEntity";
import _ from 'lodash';
import {APIService} from "../../framework/api/APIService";
import {ServerResources} from "../../framework/routing/ServerResources";
import {PSRLayout} from "../../framework/view/PSRLayout";

interface MasterDataListComponentProps {
    resource: string;
    listItemCursor?: (x: string) => string;
    onItemSelect?: (x: ReferenceEntity) => void;
    childrenFieldName?: string;
}

export const MasterDataListComponentView: FunctionComponent<MasterDataListComponentProps> = ({
                                                                                             children,
                                                                                             resource,
                                                                                             listItemCursor = () => "auto",
                                                                                             onItemSelect = () => {
                                                                                             },
                                                                                             childrenFieldName
                                                                                         }) => {
    const [masterDataList, update] = useState([]);

    useEffect(() => {
        APIService.loadAll(ServerResources.getResourceBaseURL(resource)).then((data) => {
            update(data);
        });
    }, []);


    const humanReadableResource = _.startCase(_.camelCase(resource));
    return (
        <PSRLayout>
            <Descriptions title={`${humanReadableResource}s`}/>
            <List
                bordered
                itemLayout="horizontal"
                dataSource={masterDataList}
                header={<Row><Col span={8}><b>Name</b></Col><Col span={8}><b>Document types</b></Col></Row>}
                renderItem={item => (
                    <List.Item
                        actions={[<Link to={AppResources.getEditPath(resource, ReferenceEntities.findEntityByName(masterDataList, item.name).id)}>edit</Link>]}
                        style={{
                            backgroundColor: 'lightgrey',
                            paddingLeft: 10,
                            cursor: listItemCursor(item.name),
                        }}
                        onClick={() => {
                            onItemSelect(_.find(masterDataList, (x) => x.name === item.name));
                        }}><Col span={8}>{item.name}</Col>
                        {childrenFieldName && <Col span={14}>{childrenText(item, childrenFieldName)}</Col>}
                    </List.Item>
                )}
            />
            <br/>
            <Row justify="end">
                <Button type="default" style={{alignSelf: 'end'}}>
                    <Link to={AppResources.getCreatePath(resource)}>{`Add ${humanReadableResource}`}</Link>
                </Button>
            </Row>
        </PSRLayout>);
};

const childrenText = function (item: any, fieldName: string) {
    const children = item[fieldName] as [ReferenceEntity];
    return _.join(children.map((child) => child.name), ", ");
};