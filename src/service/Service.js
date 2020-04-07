import React, {useState} from 'react';
import {Card, Form, Input, Button, Checkbox, Collapse} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {ServiceTypeData} from "./model/ServiceTypeData";

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
    const [serviceTypeData, update] = useState(ServiceTypeData.newInstance());

    return (
        <PSRLayout>
            <Form {...layout} name="basic" onFinish={() => {
            }} onFinishFailed={() => {
            }}>
                <Form.Item
                    label="Name" name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please provide service name',
                        },
                    ]}>
                    <Input onChange={(value) => {
                        serviceTypeData.name = value;
                        update(serviceTypeData);
                    }}/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please provide service description',
                        },
                    ]}>
                    <ReactQuill theme="snow" value={""}/>
                </Form.Item>

                <Form.Item
                    label="References" name="references"
                    rules={[
                        {
                            message: 'Please provide references',
                        },
                    ]}>
                    <ReactQuill theme="snow" value={""}/>
                </Form.Item>

                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Enrolment" key="1">
                        <p>Foo</p>
                    </Panel>
                </Collapse>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </PSRLayout>
    );
}