import {Card, Col, Form, InputNumber, Radio} from 'antd';
import React, {FunctionComponent} from 'react';
import {EntityRelationshipType, PhotographSubmission, PhotographType} from "./model/Service";
import {ReferenceEntityFormItem} from "../master-data/ReferenceEntityFormItem";
import {BooleanFormItem} from "../framework/view/BooleanFormItem";

type PhotographSubmissionCreateEditViewProps = {
    photographTypes: Array<PhotographType>,
    namePrefix: string,
    entityRelationshipTypes: Array<EntityRelationshipType>,
    photographSubmission: PhotographSubmission,
    onStateChange: Function
};

export const PhotographSubmissionCreateEditView: FunctionComponent<PhotographSubmissionCreateEditViewProps> = ({children, namePrefix, photographTypes, entityRelationshipTypes, photographSubmission, onStateChange}) => {
    return <Card>
        <Col>
            <ReferenceEntityFormItem referenceEntities={photographTypes}
                                     onReferenceEntityChange={(referenceEntity) => photographSubmission.photographType = referenceEntity} formItemName="photographType"
                                     label="Photograph type"/>
        </Col>
        <Col>
            <BooleanFormItem label="Cross sign required?" formItemName={`${namePrefix}.crossSignRequired`} value={photographSubmission.crossSignRequired} onValueChange={(value) => photographSubmission.crossSignRequired = value}/>
        </Col>
        <Col>
            <Form.Item label="Number of copies" name={`${namePrefix}.numberOfCopies`}>
                <InputNumber onChange={(value) => {
                    photographSubmission.numberOfCopies = value;
                }}/>
            </Form.Item>
        </Col>
        <Col>
            <ReferenceEntityFormItem referenceEntities={entityRelationshipTypes}
                                     onReferenceEntityChange={(referenceEntity) => photographSubmission.entityRelationshipType = referenceEntity}
                                     formItemName={`${namePrefix}.entityRelationshipType`}
                                     label="Entity relationship type"/>
        </Col>
    </Card>;
};