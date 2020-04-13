import React, {FunctionComponent} from 'react';
import {Button, Form, Space} from 'antd';
import PropTypes from 'prop-types';

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

type PSRFormProps = {
    submitHandler: Function
};

export const PSRForm: FunctionComponent<PSRFormProps> = ({submitHandler, children}) => {
    return <Form {...layout} name="basic" onFinish={() => {
                        }} onFinishFailed={() => {
                        }}>
        <Space direction="vertical" style={{width: "100%"}}>
            {children}
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" onClick={() => submitHandler()}>
                    Submit
                </Button>
            </Form.Item>
        </Space>
    </Form>
};