import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

export function service() {
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
                    <Input/>
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

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </PSRLayout>
    );
}