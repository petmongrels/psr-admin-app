import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, Card, Col, Descriptions, Form, Input, Row} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import {PSRForm} from "../framework/view/PSRForm";
import {ServiceCreateEdit} from "./model/ServiceCreateEdit";
import {ApplicationFormCreateEditView} from "./ApplicationFormCreateEditView";
import {ReferenceEntityFormItem} from "../master-data/ReferenceEntityFormItem";
import {Application, ApplicationForm, PhotographSubmission, ProofSubmission, Service} from "./model/Service";
import {CommunicationMedium} from '../master-data/model/CommunicationMedium';
import {ServiceService} from "./service/ServiceService";
import {PhotographSubmissionCreateEditView} from "./PhotographSubmissionCreateEditView";
import {ProofSubmissionCreateEditView} from "./ProofSubmissionCreateEditView";

const {TextArea} = Input;

const draftKey = 'service.draft';

type ServiceCreateEditViewProps = {}

class FormState {
    formValues: object;
    service: Service;

    constructor(formValues: object, service: Service) {
        this.formValues = formValues;
        this.service = service;
    }
}

const tabListNoTitle = [
    {
        key: 'proofs',
        tab: 'Proofs',
    },
    {
        key: 'photographs',
        tab: 'Photographs',
    }
];


export const ServiceCreateEditView: FunctionComponent<ServiceCreateEditViewProps> = ({}) => {
    const [form] = Form.useForm();
    const [serviceCreateEdit, update] = useState<ServiceCreateEdit>(ServiceCreateEdit.newInstance());
    const [activeTabKey, updateTab] = useState('proofs');

    const updateState = function () {
        update(ServiceCreateEdit.clone(serviceCreateEdit));
    };

    useEffect(() => {
        ServiceService.loadAll(serviceCreateEdit, updateState);
    }, []);

    return (
        <PSRLayout>
            <PSRForm submitHandler={() => {
                ServiceService.save(serviceCreateEdit.service, (savedService: any) => {
                    serviceCreateEdit.service = savedService;
                    updateState();
                });
            }} name="serviceCreateEdit" form={form}>
                <Row justify="end">
                    <Button type="default" htmlType="button" onClick={() => {
                        localStorage.setItem(draftKey, JSON.stringify(new FormState(form.getFieldsValue(), serviceCreateEdit.service)));
                    }}>Save as draft</Button>
                    <Button type="default" htmlType="button" style={{marginLeft: 10}} onClick={() => {
                        let formState: FormState = JSON.parse(localStorage.getItem(draftKey));
                        form.setFieldsValue(formState.formValues);
                        serviceCreateEdit.service = formState.service;
                        updateState();
                    }}>Restore from draft</Button>
                    <Button type="default" htmlType="button" style={{marginLeft: 10}} onClick={() => {
                        localStorage.removeItem(draftKey);
                    }}>Clear draft</Button>
                </Row>
                <Card key="service">
                    <Descriptions title="SERVICE DETAILS" style={{marginLeft: 10}}/>
                    <Form.Item label="Name" name="name" rules={[{required: true}]}>
                        <Input onChange={(e) => {
                            serviceCreateEdit.service.name = e.target.value;
                            updateState();
                        }}/>
                    </Form.Item>

                    <Form.Item label="Description" name="description" rules={[{required: true}]}>
                        <TextArea onChange={(e) => {
                            serviceCreateEdit.service.description = e.target.value;
                            updateState();
                        }} autoSize={{minRows: 2}}/>
                    </Form.Item>

                    <Form.Item label="References" name="references">
                        <TextArea onChange={(e) => {
                            serviceCreateEdit.service.externalReferences = e.target.value;
                            updateState();
                        }} autoSize={{minRows: 2}}/>
                    </Form.Item>
                </Card>

                {serviceCreateEdit.service.components.map((serviceComponent, index) => {
                        let prefix = `serviceComponent.${index}.`;
                        return <Card key={prefix}>
                            <Descriptions title="SERVICE COMPONENT - 1" style={{marginLeft: 10}}/>
                            <Form.Item label="Name" name={`${prefix}name`}
                                       rules={[{
                                           required: true,
                                           message: 'This field is mandatory'
                                       }]}>
                                <Input onChange={(e) => {
                                    serviceComponent.name = e.target.value;
                                    updateState();
                                }}/>
                            </Form.Item>

                            {serviceComponent.applications.map((application, index) => {
                                const applicationPrefix = `${prefix}application.${index}.`;
                                return <Col style={{backgroundColor: '#f5f5f5'}} key={applicationPrefix}>
                                    <Descriptions title="APPLICATION - 1" style={{marginLeft: 40, paddingTop: 10}}/>
                                    <Row style={{paddingRight: 10}} key={`${applicationPrefix}name`}>
                                        <Col span={24}>
                                            <Form.Item label="Application name" name={`${applicationPrefix}name`}
                                                       rules={[{
                                                           required: true,
                                                           message: 'This field is mandatory'
                                                       }]}>
                                                <Input onChange={(e) => {
                                                    serviceComponent.applications[0].name = e.target.value;
                                                    updateState();
                                                }}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row style={{paddingRight: 10}} key={`${applicationPrefix}communicationMedium`}>
                                        <Col span={24}>
                                            <ReferenceEntityFormItem formItemName={`${applicationPrefix}communicationMedium`} label="Communication medium"
                                                                     referenceEntities={serviceCreateEdit.communicationMediums}
                                                                     onReferenceEntityChange={(referenceEntity) => {
                                                                         application.communicationMedium = referenceEntity as CommunicationMedium;
                                                                         updateState();
                                                                     }
                                                                     }/>
                                        </Col>
                                    </Row>

                                    {application.communicationMedium && application.communicationMedium.requiresAddress &&
                                    <Row style={{paddingRight: 10}} key={`${applicationPrefix}communicationAddress`}>
                                        <Col span={24}>
                                            <Form.Item label="Communication address" name={`${applicationPrefix}communicationAddress`}
                                                       rules={[{
                                                           required: true
                                                       }]}>
                                                <Input onChange={(e) => {
                                                    serviceComponent.applications[0].communicationAddress = e.target.value;
                                                    updateState();
                                                }}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>}

                                    <Card style={{width: '100%', marginLeft: 10, marginBottom: 10}} tabList={tabListNoTitle}
                                          activeTabKey={activeTabKey} onTabChange={key => {
                                        updateTab(key);
                                    }}>
                                        {activeTabKey === 'photographs' ? application.photographSubmissions.map((photographSubmission, index) =>
                                                <div key={`photographSubmissionDiv.${index}`}>
                                                    <PhotographSubmissionCreateEditView photographTypes={serviceCreateEdit.photographTypes}
                                                                                        photographSubmission={photographSubmission}
                                                                                        entityRelationshipTypes={serviceCreateEdit.entityRelationshipTypes}
                                                                                        namePrefix={`photographSubmission.${index}.`}
                                                                                        onStateChange={updateState}/>
                                                    <Col span={24} offset={22} style={{marginTop: 10}}>
                                                        <Button type="danger" onClick={() => {
                                                            Application.removePhotographSubmission(application, photographSubmission);
                                                            updateState();
                                                        }}>Remove</Button>
                                                    </Col>
                                                </div>
                                            )
                                            : application.proofSubmissions.map((proofSubmission, index) =>
                                                <div key={`proofTypeSubmissionDiv.${index}`}>
                                                    <ProofSubmissionCreateEditView proofTypes={serviceCreateEdit.proofTypes}
                                                                                   entityRelationshipTypes={serviceCreateEdit.entityRelationshipTypes}
                                                                                   documentTypes={serviceCreateEdit.documentTypes}
                                                                                   namePrefix={`proofSubmission.${index}.`}
                                                                                   proofSubmission={proofSubmission} onStateChange={updateState}/>
                                                    <Col span={24} offset={22} style={{marginTop: 10}}>
                                                        <Button type="danger" key="removeProofSubmission" onClick={() => {
                                                            Application.removeProofSubmission(application, proofSubmission);
                                                            updateState();
                                                        }}>Remove</Button>
                                                    </Col>
                                                </div>
                                            )
                                        }
                                        <Col offset={21} key={`addPhotoOrProof`} style={{marginTop: 10}}>
                                            {activeTabKey === 'photographs' ?
                                                <Button type="link" key="addPhotographSubmission" onClick={() => {
                                                    application.photographSubmissions.push(PhotographSubmission.newInstance());
                                                    updateState();
                                                }}>Add Required Photo</Button> :
                                                <Button type="link" key="addProofSubmission" onClick={() => {
                                                    application.proofSubmissions.push(ProofSubmission.newInstance());
                                                    updateState();
                                                }}>Add Required Proof</Button>
                                            }
                                        </Col>
                                    </Card>

                                    <Row style={{paddingRight: 10, paddingLeft: 10}} key={`${applicationPrefix}applicationForm`}>
                                        {serviceComponent.applications[0].applicationForms.map((applicationForm, index) => {
                                            let applicationFormNamePrefix = `${applicationPrefix}applicationForm.${index}.`;
                                            return <ApplicationFormCreateEditView applicationForm={applicationForm}
                                                                                  namePrefix={applicationFormNamePrefix}
                                                                                  updateState={() => updateState()}
                                                                                  documentTypes={serviceCreateEdit.documentTypes} key={applicationFormNamePrefix}/>
                                        })}
                                    </Row>
                                    <Row justify="end" key={`${applicationPrefix}addApplicationForm`}>
                                        <Button type="link" onClick={() => {
                                            serviceComponent.applications[0].applicationForms.push(ApplicationForm.newInstance());
                                            updateState();
                                        }
                                        }>Add Application Form</Button>
                                    </Row>
                                </Col>
                            })
                            }
                        </Card>
                    }
                )};
                <Button type="primary" htmlType="submit" key="addServiceComponent">Add Service Component</Button>
            </PSRForm>
        </PSRLayout>
    )
};