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
        <Col span={24} key={`${namePrefix}proofType`}>
            <ReferenceEntityFormItem referenceEntities={proofTypes}
                                     onReferenceEntityChange={(referenceEntity) => {
                                         proofSubmission.proofType = referenceEntity as ProofType;
                                         onStateChange();
                                     }}
                                     formItemName={`${namePrefix}proofType`}
                                     label="Proof type"/>
        </Col>

        <Col span={24} key={`${namePrefix}relationship`}>
            <ReferenceEntityFormItem referenceEntities={entityRelationshipTypes}
                                     onReferenceEntityChange={(referenceEntity) => proofSubmission.entityRelationshipType = referenceEntity}
                                     formItemName={`${namePrefix}relationship`} label="Relationship"/>
        </Col>

        {proofSubmission.proofType &&
        <Col span={24} key={`${namePrefix}proofDocuments`}>
            <Form.Item label="Documents that can be used" name={`${namePrefix}proofDocuments`}>
                <Select mode="multiple" style={{width: '100%'}} placeholder="Please select" onChange={(values) => {
                    proofSubmission.proofDocuments = values.map((value) => ReferenceEntities.findEntityByName(documentTypes, value));
                    onStateChange();
                }
                } value={proofSubmission.proofDocuments.map((proofDocument) => proofDocument.name)}>
                    {proofSubmission.proofType.documentTypes.map((documentType) => <Option value={documentType.name}>{documentType.name}</Option>)}
                </Select>
            </Form.Item>
        </Col>}

        <Col span={24} key={`${namePrefix}originalToBeShown`}>
            <BooleanFormItem label="Original to be shown?" formItemName={`${namePrefix}originalToBeShown`} value={proofSubmission.originalToBeShown}
                             onValueChange={(value) => proofSubmission.originalToBeShown = value} mandatory={true}/>
        </Col>

        <Col span={24} key={`${namePrefix}numberOfCopies`}>
            <Form.Item label="Number of copies" name={`${namePrefix}numberOfCopies`}>
                <InputNumber onChange={(value) => {
                    proofSubmission.numberOfCopies = value;
                }}/>
            </Form.Item>
        </Col>

        <Col span={24} key={`${namePrefix}reason`}>
            <Form.Item label="Reason this document is required (optional)" name={`${namePrefix}reason`}>
                <Input onChange={(e) => {
                    proofSubmission.reason = e.target.value;
                }}/>
            </Form.Item>
        </Col>
    </Card>;
};