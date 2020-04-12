import React from 'react';
import {Form, Space, Button} from 'antd';

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

export function PSRForm(props) {
    return <Form {...layout} name="basic" onFinish={() => {
                        }} onFinishFailed={() => {
                        }}>
        <Space direction="vertical" style={{width: "100%"}}>
            {props.children}
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Space>
    </Form>
}