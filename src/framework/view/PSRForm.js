import React from 'react';
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

export function PSRForm(props) {
    return <Form {...layout} name="basic" onFinish={() => {
                        }} onFinishFailed={() => {
                        }}>
        <Space direction="vertical" style={{width: "100%"}}>
            {props.children}
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" onClick={props.submitHandler}>
                    Submit
                </Button>
            </Form.Item>
        </Space>
    </Form>
}

PSRForm.propTypes = {
    submitHandler: PropTypes.func.isRequired
};