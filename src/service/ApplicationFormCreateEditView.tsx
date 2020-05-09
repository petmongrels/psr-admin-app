import {Button, Card, Col, Descriptions, Form, Input, Row} from 'antd';
import React, {FunctionComponent, useState} from 'react';
import {ApplicationForm, EntityRelationshipType, PhotographSubmission, PhotographType, ProofSubmission, ProofType, PSRDocumentType} from "./model/Service";
import {PhotographSubmissionCreateEditView} from "./PhotographSubmissionCreateEditView";
import {ProofSubmissionCreateEditView} from "./ProofSubmissionCreateEditView";

type ApplicationFormCreateEditViewProps = {
    namePrefix: string,
    applicationForm: ApplicationForm,
    documentTypes: Array<PSRDocumentType>,
    updateState: Function
};

export const ApplicationFormCreateEditView: FunctionComponent<ApplicationFormCreateEditViewProps> = ({children, namePrefix, applicationForm, documentTypes, updateState}) => {
    return <div style={{backgroundColor: '#d9d9d9', paddingTop: 10}}>
        <Descriptions title="APPLICATION FORM - 1" style={{marginLeft: 60, paddingTop: 10}}/>
        <Row style={{paddingRight: 10}}>
            <Col span={24} key={`${namePrefix}name`}>
                <Form.Item label="Form name" name={`${namePrefix}name`}
                           rules={[{
                               required: true,
                               message: 'This field is mandatory'
                           }]}>
                    <Input onChange={(e) => {
                        applicationForm.name = e.target.value;
                        updateState();
                    }}/>
                </Form.Item>
            </Col>
            <Col span={24} key={`${namePrefix}officialFileURL`}>
                <Form.Item label="Official file link" name={`${namePrefix}officialFileURL`}
                           rules={[{
                               required: true,
                               message: 'This field is mandatory'
                           }]}>
                    <Input onChange={(e) => {
                        applicationForm.officialFileURL = e.target.value;
                        updateState();
                    }}/>
                </Form.Item>
            </Col>
            <Col span={24} key={`${namePrefix}fileURL`}>
                <Form.Item label="Blank form location" name={`${namePrefix}blankFormLocation`}>
                    <Input onChange={(e) => {
                        applicationForm.blankFormLocation = e.target.value;
                        updateState();
                    }}/>
                </Form.Item>
            </Col>
        </Row>
    </div>;
};