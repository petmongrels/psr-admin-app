import {Card, Col, Form, Input, InputNumber, Select} from 'antd';
import React, {FunctionComponent} from 'react';
import {EntityRelationshipType, ProofSubmission, ProofType, PSRDocumentType} from "./model/Service";
import {ReferenceEntityFormItem} from "../master-data/ReferenceEntityFormItem";
import {BooleanFormItem} from "../framework/view/BooleanFormItem";
import {ReferenceEntities} from "../framework/model/ReferenceEntity";

const {Option} = Select;

type ProofSubmissionCreateEditViewProps = {
    namePrefix: string,
    proofSubmission: ProofSubmission,
    entityRelationshipTypes: Array<EntityRelationshipType>,
    proofTypes: Array<ProofType>,
    documentTypes: Array<PSRDocumentType>,
    onStateChange: Function
};

export const ProofSubmissionCreateEditView: FunctionComponent<ProofSubmissionCreateEditViewProps> = ({children, namePrefix, proofSubmission, entityRelationshipTypes, proofTypes, documentTypes, onStateChange}) => {
    return <Card style={{width: 400}}>
        <Col span={24}>
            <Form.Item label="Name" name={`${namePrefix}name`}>
                <Input onChange={(e) => {
                    proofSubmission.name = e.target.value;
                }}/>
            </Form.Item>
        </Col>

        <Col span={24}>
            <ReferenceEntityFormItem referenceEntities={entityRelationshipTypes}
                                     onReferenceEntityChange={(referenceEntity) => proofSubmission.entityRelationshipType = referenceEntity}
                                     formItemName={`${namePrefix}relationship`} label="Relationship"/>
        </Col>

        <Col span={24}>
            <ReferenceEntityFormItem referenceEntities={proofTypes}
                                     onReferenceEntityChange={(referenceEntity) => proofSubmission.proofType = referenceEntity} formItemName={`${namePrefix}proofType`}
                                     label="Proof type"/>
        </Col>

        <Col span={24}>
            <BooleanFormItem label="Original to be shown" formItemName={`${namePrefix}originalToBeShown`} value={proofSubmission.originalToBeShown}
                             onValueChange={(value) => proofSubmission.originalToBeShown = value}/>
        </Col>

        <Col span={24}>
            <Form.Item label="Number of copies" name={`${namePrefix}numberOfCopies`}>
                <InputNumber onChange={(value) => {
                    proofSubmission.numberOfCopies = value;
                }}/>
            </Form.Item>
        </Col>

        <Col span={24}>
            <Form.Item label="Proof documents required" name={`${namePrefix}proofDocuments`}>
                <Select mode="multiple" style={{width: '100%'}} placeholder="Please select" onChange={(values) => {
                    proofSubmission.proofDocuments = values.map((value) => ReferenceEntities.findEntityByName(documentTypes, value));
                    onStateChange();
                }
                } value={proofSubmission.proofDocuments.map((proofDocument) => proofDocument.name)}>
                    {documentTypes.map((documentType) => <Option value={documentType.name}>{documentType.name}</Option>)}
                </Select>
            </Form.Item>
        </Col>
    </Card>;
};