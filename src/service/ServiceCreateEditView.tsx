import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Descriptions, Form, Input, Row} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import {PSRForm} from "../framework/view/PSRForm";
import {APIService} from "../framework/api/APIService";
import {ServiceCreateEdit} from "./model/ServiceCreateEdit";
import {PSRResources} from "../framework/routing/PSRResources";
import {ApplicationFormCreateEditView} from "./ApplicationFormCreateEditView";
import {ReferenceEntityFormItem} from "../master-data/ReferenceEntityFormItem";
import {ApplicationForm} from "./model/Service";

const {TextArea} = Input;

export function ServiceCreateEditView(props: any) {
    const [serviceCreateEdit, update] = useState<ServiceCreateEdit>(ServiceCreateEdit.newInstance());

    const updateState = function () {
        update(ServiceCreateEdit.clone(serviceCreateEdit));
    };

    useEffect(() => {
        APIService.loadAll(PSRResources.getResourceListURL("communication_medium")).then((commMediums) => {
            serviceCreateEdit.communicationMediums = commMediums;
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
            }}>
                <Card>
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
                        return <Card>
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

                            {serviceComponent.applications.map((application, index) =>
                                <div>
                                    <Col style={{backgroundColor: '#f5f5f5'}}>
                                        <Descriptions title="APPLICATION - 1" style={{marginLeft: 40, paddingTop: 10}}/>
                                        <Row style={{paddingRight: 10}}>
                                            <Col span={24}>
                                                <Form.Item label="Application name" name={`${prefix}.application.name`}
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

                                        <Row style={{paddingRight: 10}}>
                                            <Col span={24}>
                                                <ReferenceEntityFormItem formItemName="communicationMedium" label="Communication medium"
                                                                         referenceEntities={serviceCreateEdit.communicationMediums}
                                                                         onReferenceEntityChange={(referenceEntity) => {
                                                                             serviceComponent.applications[0].communicationMedium = referenceEntity;
                                                                             updateState();
                                                                         }
                                                                         }/>
                                            </Col>
                                        </Row>

                                        <Row style={{paddingRight: 10}}>
                                            <Col span={24}>
                                                <Form.Item label="Communication address" name={`${prefix}.communication.address`}
                                                           rules={[{
                                                               required: true,
                                                               message: 'This field is mandatory'
                                                           }]}>
                                                    <Input onChange={(e) => {
                                                        serviceComponent.applications[0].communicationAddress = e.target.value;
                                                        updateState();
                                                    }}/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row style={{paddingRight: 10, paddingLeft: 10}}>
                                            {serviceComponent.applications[0].applicationForms.map((applicationForm, index) =>
                                                <ApplicationFormCreateEditView applicationForm={applicationForm}
                                                                               entityRelationshipTypes={serviceCreateEdit.entityRelationshipTypes}
                                                                               photographTypes={serviceCreateEdit.photographTypes} namePrefix={`${prefix}`}
                                                                               proofTypes={serviceCreateEdit.proofTypes} updateState={() => updateState()}
                                                                               documentTypes={serviceCreateEdit.documentTypes}/>)}
                                        </Row>
                                        <Row justify="end">
                                            <Button type="link" onClick={() => {
                                                serviceComponent.applications[0].applicationForms.push(ApplicationForm.newInstance());
                                                updateState();
                                            }
                                            }>Add Application Form</Button>
                                        </Row>
                                    </Col>
                                </div>)
                            }
                        </Card>
                    }
                )};
                <Button type="primary" htmlType="submit">Add Service Component</Button>
            </PSRForm>
        </PSRLayout>
    )
}