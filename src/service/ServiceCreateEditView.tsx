import React, {useState, useEffect} from 'react';
import {Button, Collapse, Form, Input, Select, Row, Col, Descriptions, Card} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import {PSRForm} from "../framework/view/PSRForm";
import {APIService} from "../framework/api/APIService";
import {ServiceCreateEdit} from "./model/ServiceCreateEdit";
import {PSRResources} from "../framework/routing/PSRResources";
import {ReferenceEntities} from "../framework/model/ReferenceEntity";
import {ApplicationFormCreateEditView} from "./ApplicationFormCreateEditView";

const {TextArea} = Input;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const {Panel} = Collapse;
const {Option} = Select;

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
    }, []);

    return (
        <PSRLayout>
            <PSRForm submitHandler={() => {
            }}>
                <Card>
                    <Descriptions title="SERVICE DETAILS" style={{marginLeft: 10}}/>
                    <Form.Item
                        label="Name" name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please provide service name',
                            },
                        ]}>
                        <Input onChange={(e) => {
                            serviceCreateEdit.service.name = e.target.value;
                            updateState();
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please provide service description'
                            },
                        ]}>
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
                        let prefix = (index + 2).toString();
                        return <Card>
                            <Descriptions title="SERVICE COMPONENT - 1" style={{marginLeft: 10}}/>
                            <Form.Item label="Name" name={`${prefix}.component.name`}
                                       rules={[{
                                           required: true,
                                           message: 'This field is mandatory'
                                       }]}>
                                <Input onChange={(e) => {
                                    serviceComponent.name = e.target.value;
                                    updateState();
                                }}/>
                            </Form.Item>

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
                                        <Form.Item label="Communication medium" name={`${prefix}.communication.medium`}
                                                   rules={[{
                                                       required: true,
                                                       message: 'This field is mandatory'
                                                   }]}>
                                            <Select style={{width: 120}} onChange={(value) => {
                                                serviceComponent.applications[0].communicationMedium = ReferenceEntities.findEntityByName(serviceCreateEdit.communicationMediums, value.toString());
                                                updateState();
                                            }}>
                                                {serviceCreateEdit.communicationMediums.map((commMedium) => {
                                                    return <Option value={commMedium.name}>{commMedium.name}</Option>;
                                                })}
                                            </Select>
                                        </Form.Item>
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
                                <ApplicationFormCreateEditView applicationForm={serviceComponent.applications[0].applicationForms[0]} index={0} updateState={() => updateState()}/>
                            </Col>
                        </Card>
                    }
                )};
                <Button type="primary" htmlType="submit">Add Service Component</Button>
            </PSRForm>
        </PSRLayout>
    )
        ;
}