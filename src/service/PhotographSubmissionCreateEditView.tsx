import {Card, Col, Form, InputNumber, Radio} from 'antd';
import React, {FunctionComponent} from 'react';
import {EntityRelationshipType, PhotographSubmission, PhotographType} from "./model/Service";
import {ReferenceEntityFormItem} from "../master-data/ReferenceEntityFormItem";

type PhotographSubmissionCreateEditViewProps = {
    photographTypes: Array<PhotographType>,
    namePrefix: string,
    entityRelationshipTypes: Array<EntityRelationshipType>,
    photographSubmission: PhotographSubmission,
    onStateChange: Function
};

export const PhotographSubmissionCreateEditView: FunctionComponent<PhotographSubmissionCreateEditViewProps> = ({children, namePrefix, photographTypes, entityRelationshipTypes, photographSubmission, onStateChange}) => {
    return <Card style={{width: 300}}>
        <Col span={24}>
            <ReferenceEntityFormItem referenceEntities={photographTypes}
                                     onReferenceEntityChange={(referenceEntity) => photographSubmission.photographType = referenceEntity} formItemName="photographType"
                                     label="Photograph type"/>
        </Col>
        <Col span={24}>
            <Form.Item label="Cross sign required?" name={`${namePrefix}.crossSignRequired`}>
                <Radio.Group onChange={(e) => {
                    photographSubmission.crossSignRequired = e.target.value;
                    onStateChange();
                }} value={photographSubmission.crossSignRequired}>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>
        </Col>
        <Col span={24}>
            <Form.Item label="Number of copies" name={`${namePrefix}.crossSignRequired`}>
                <InputNumber onChange={(value) => {
                    photographSubmission.numberOfCopies = value;
                }}/>
            </Form.Item>
        </Col>
        <Col span={24}>
            <ReferenceEntityFormItem referenceEntities={entityRelationshipTypes}
                                     onReferenceEntityChange={(referenceEntity) => photographSubmission.entityRelationshipType = referenceEntity} formItemName="entityRelationshipType"
                                     label="Entity relationship type"/>
        </Col>
    </Card>;
};