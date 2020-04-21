import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, Card, Col, Descriptions, Form, Input, Row} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import {PSRForm} from "../framework/view/PSRForm";
import {APIService} from "../framework/api/APIService";
import {ServiceCreateEdit} from "./model/ServiceCreateEdit";
import {PSRResources} from "../framework/routing/PSRResources";
import {ApplicationFormCreateEditView} from "./ApplicationFormCreateEditView";
import {ReferenceEntityFormItem} from "../master-data/ReferenceEntityFormItem";
import {ApplicationForm, Service} from "./model/Service";
import {CommunicationMedium} from '../master-data/model/CommunicationMedium';

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

export const ServiceCreateEditView: FunctionComponent<ServiceCreateEditViewProps> = ({}) => {
    const [form] = Form.useForm();
    const [serviceCreateEdit, update] = useState<ServiceCreateEdit>(ServiceCreateEdit.newInstance());

    const updateState = function () {
        update(ServiceCreateEdit.clone(serviceCreateEdit));
    };

    useEffect(() => {
        APIService.loadAll(PSRResources.getResourceListURL("communication_medium")).then((resources) => {
            serviceCreateEdit.communicationMediums = resources.map((resource: any) => CommunicationMedium.fromResource(resource));
            updateState();
        });
        APIService.loadAll(PSRResources.getResourceListURL("document_type")).then((documentTypes) => {
            serviceCreateEdit.documentTypes = documentTypes;
            updateState();
        });
    }, []);

    return (
        <PSRLayout>
            <PSRForm submitHandler={() => {
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
                            serviceCreateEdit.service.references = e.target.value;
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

                                    <Row style={{paddingRight: 10, paddingLeft: 10}} key={`${applicationPrefix}applicationForm`}>
                                        {serviceComponent.applications[0].applicationForms.map((applicationForm, index) => {
                                            let applicationFormNamePrefix = `${applicationPrefix}applicationForm.${index}.`;
                                            return <ApplicationFormCreateEditView applicationForm={applicationForm}
                                                                           entityRelationshipTypes={serviceCreateEdit.entityRelationshipTypes}
                                                                           photographTypes={serviceCreateEdit.photographTypes}
                                                                           namePrefix={applicationFormNamePrefix}
                                                                           proofTypes={serviceCreateEdit.proofTypes} updateState={() => updateState()}
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