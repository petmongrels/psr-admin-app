import React, {useState, useEffect} from 'react';
import {Button, Collapse, Form, Input, Select} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import {PSRForm} from "../framework/view/PSRForm";
import {APIService} from "../framework/api/APIService";
import {ServiceCreateEdit} from "./model/ServiceCreateEdit";
import {PSRResources} from "../framework/routing/PSRResources";

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
const { Option } = Select;

export function ServiceCreateEditView(props: any) {
    const [serviceCreateEdit, update] = useState<ServiceCreateEdit>(ServiceCreateEdit.newInstance());

    const updateState = function () {
        update(ServiceCreateEdit.clone(serviceCreateEdit));
    };

    useEffect(() => {
        APIService.loadAll(PSRResources.getResourceListURL("communication_medium")).then((commMediums) => {
            serviceCreateEdit.communicationMediums = commMediums;
            update(serviceCreateEdit);
        });
    });

    return (
        <PSRLayout>
            <PSRForm submitHandler={() => {}}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Service details" key="1">
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
                    </Panel>
                </Collapse>

                {serviceCreateEdit.service.components.map((serviceComponent, index) => {
                        let prefix = (index + 2).toString();
                        return <Collapse defaultActiveKey={[prefix]}>
                            <Panel header={`Service Component - ${index + 1}`} key={prefix}>
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

                                <Collapse defaultActiveKey={['foo']}>
                                    <Panel header={`Application - ${index + 100}`} key={prefix}>
                                        <Form.Item label="Application name" name={`${prefix}.component.name`}
                                                   rules={[{
                                                       required: true,
                                                       message: 'This field is mandatory'
                                                   }]}>
                                            <Input onChange={(e) => {
                                                serviceComponent.applications[0].name = e.target.value;
                                                updateState();
                                            }}/>
                                        </Form.Item>

                                        <Form.Item label="Communication medium" name={`${prefix}.component.name`}
                                                   rules={[{
                                                       required: true,
                                                       message: 'This field is mandatory'
                                                   }]}>
                                            <Select style={{ width: 120 }} onChange={(value) => {
                                                // serviceComponent.applications[0].communicationMedium = value;
                                                // updateState();
                                            }}>
                                                {/*<Option value={}>Jack</Option>*/}
                                            </Select>
                                            <Select onChange={(e) => {
                                                updateState();
                                            }}/>
                                        </Form.Item>
                                    </Panel>
                                </Collapse>
                            </Panel>
                        </Collapse>
                    }
                )};
                <Button type="primary" htmlType="submit">Add Service Component</Button>
            </PSRForm>
        </PSRLayout>
    );
}