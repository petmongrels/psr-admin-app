import {Card, Col, Descriptions, Form, Input, Row} from 'antd';
import React, {FunctionComponent, useState} from 'react';
import {ApplicationForm, EntityRelationshipType, PhotographType, ProofType} from "./model/Service";
import {PhotographSubmissionCreateEditView} from "./PhotographSubmissionCreateEditView";

type ApplicationFormCreateEditViewProps = {
    applicationFormIndex: number,
    applicationForm: ApplicationForm,
    photographTypes: Array<PhotographType>,
    proofTypes: Array<ProofType>,
    entityRelationshipTypes: Array<EntityRelationshipType>,
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

export const ApplicationFormCreateEditView: FunctionComponent<ApplicationFormCreateEditViewProps> = ({children, applicationFormIndex, applicationForm, photographTypes, entityRelationshipTypes, updateState}) => {
    const [activeTabKey, update] = useState('photographs');

    let photographSubmissions = function () {
        return applicationForm.photographSubmissions.map((photographSubmission) =>
            <PhotographSubmissionCreateEditView photographTypes={photographTypes} photographSubmission={photographSubmission}
                                                entityRelationshipTypes={entityRelationshipTypes} namePrefix={`${applicationFormIndex}.0`}
                                                onStateChange={updateState}/>
        );
    };

    return <div style={{backgroundColor: '#d9d9d9', paddingTop: 10}}>
        <Descriptions title="APPLICATION FORM - 1" style={{marginLeft: 60, paddingTop: 10}}/>
        <Row style={{paddingRight: 10}}>
            <Col span={24}>
                <Form.Item label="Form name" name={`application.form.${applicationFormIndex}.name`}
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
            <Col span={24}>
                <Form.Item label="Official file link" name={`application.form.${applicationFormIndex}.officialFileURL`}
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
            <Col span={24}>
                <Form.Item label="File link" name={`application.form.${applicationFormIndex}.fileURL`}>
                    <Input onChange={(e) => {
                        applicationForm.fileURL = e.target.value;
                        updateState();
                    }}/>
                </Form.Item>
            </Col>

            <Card
                style={{width: '100%', marginLeft: 10, marginBottom: 10}}
                tabList={tabListNoTitle}
                activeTabKey={'photographs'}
                onTabChange={key => {
                    update(key);
                }}
            >
                {activeTabKey === 'photographs' ? photographSubmissions()
                    : <div/>
                }
            </Card>
        </Row>
    </div>;
};