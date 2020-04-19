import {Button, Card, Col, Descriptions, Form, Input, Row} from 'antd';
import React, {FunctionComponent, useState} from 'react';
import {ApplicationForm, EntityRelationshipType, PhotographSubmission, PhotographType, ProofSubmission, ProofType, PSRDocumentType} from "./model/Service";
import {PhotographSubmissionCreateEditView} from "./PhotographSubmissionCreateEditView";
import {ProofSubmissionCreateEditView} from "./ProofSubmissionCreateEditView";

type ApplicationFormCreateEditViewProps = {
    namePrefix: string,
    applicationForm: ApplicationForm,
    photographTypes: Array<PhotographType>,
    proofTypes: Array<ProofType>,
    entityRelationshipTypes: Array<EntityRelationshipType>,
    documentTypes: Array<PSRDocumentType>,
    updateState: Function
};

const tabListNoTitle = [
    {
        key: 'photographs',
        tab: 'Photographs',
    },
    {
        key: 'proofs',
        tab: 'Proofs',
    }
];

export const ApplicationFormCreateEditView: FunctionComponent<ApplicationFormCreateEditViewProps> = ({children, namePrefix, applicationForm, photographTypes, entityRelationshipTypes, proofTypes, documentTypes, updateState}) => {
    const [activeTabKey, update] = useState('photographs');

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
                <Form.Item label="File link" name={`${namePrefix}fileURL`}>
                    <Input onChange={(e) => {
                        applicationForm.fileURL = e.target.value;
                        updateState();
                    }}/>
                </Form.Item>
            </Col>

            <Card style={{width: '100%', marginLeft: 10, marginBottom: 10}} tabList={tabListNoTitle}
                  activeTabKey={activeTabKey} onTabChange={key => {
                update(key);
            }}>
                {activeTabKey === 'photographs' ? applicationForm.photographSubmissions.map((photographSubmission, index) =>

                        <PhotographSubmissionCreateEditView photographTypes={photographTypes} photographSubmission={photographSubmission}
                                                            entityRelationshipTypes={entityRelationshipTypes} namePrefix={`${namePrefix}photographSubmission.${index}.`}
                                                            onStateChange={updateState}/>
                    )
                    : applicationForm.proofSubmissions.map((proofSubmission, index) =>
                        <ProofSubmissionCreateEditView proofTypes={proofTypes}
                                                       entityRelationshipTypes={entityRelationshipTypes}
                                                       documentTypes={documentTypes}
                                                       namePrefix={`${namePrefix}proofSubmission.${index}.`}
                                                       proofSubmission={proofSubmission} onStateChange={updateState}/>
                    )
                }
                {activeTabKey === 'photographs' ? <Button type="link" key="addPhotographSubmission" onClick={() => {
                        applicationForm.photographSubmissions.push(PhotographSubmission.newInstance());
                        updateState();
                    }}>Add Photograph Submission Details</Button> :
                    <Button type="link" key="addProofSubmission" onClick={() => {
                        applicationForm.proofSubmissions.push(ProofSubmission.newInstance());
                        updateState();
                    }}>Add Proof Submission Details</Button>
                }
            </Card>
        </Row>
    </div>;
};