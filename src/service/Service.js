import React, {useState} from 'react';
import {Card, Form, Input, Button, Checkbox, Collapse, Space} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import 'react-quill/dist/quill.snow.css';
import {ServiceData} from "./model/ServiceTypeData";

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

export function Service(props) {
    const [serviceTypeData, update] = useState(ServiceData.newInstance());

    return (
        <PSRLayout>
            <Form {...layout} name="basic" onFinish={() => {
            }} onFinishFailed={() => {
            }}>
                <Space direction="vertical" style={{width: "100%"}}>
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
                                    serviceTypeData.name = e.target.value;
                                    update(ServiceData.clone(serviceTypeData));
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
                        serviceTypeData.description = e.target.value;
                        update(ServiceData.clone(serviceTypeData));
                    }} autoSize={{minRows: 2}}/>
                            </Form.Item>

                            <Form.Item label="References" name="references">
                    <TextArea onChange={(e) => {
                        serviceTypeData.description = e.target.value;
                        update(ServiceData.clone(serviceTypeData));
                    }} autoSize={{minRows: 2}}/>
                            </Form.Item>
                        </Panel>
                    </Collapse>

                    {serviceTypeData.subTypes.length === 0 ? <Button type="secondary" htmlType="submit">Add Service Component</Button> : null}

                    <Collapse defaultActiveKey={['2']}>
                        <Panel header="First service component" key="2">
                            <Form.Item
                                label="Name" name="subtype.name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please provide service name',
                                    },
                                ]}>
                                <Input onChange={(e) => {
                                    serviceTypeData.name = e.target.value;
                                    update(ServiceData.clone(serviceTypeData));
                                }}/>
                            </Form.Item>
                        </Panel>
                    </Collapse>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </PSRLayout>
    );
}