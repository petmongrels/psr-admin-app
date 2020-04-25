import React, {FunctionComponent, RefObject} from 'react';
import {Button, Form, Space} from 'antd';
import {FormInstance} from 'antd/lib/form';

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

export interface FieldData {
    name: any[];
    value: any;
    touched: boolean;
    validating: boolean;
    errors: string[];
}

type PSRFormProps = {
    name: string,
    submitHandler?: Function,
    form: FormInstance
};

let formChildren = function (children: React.ReactNode, submitHandler: Function = () => {}) {
    return <Space direction="vertical" style={{width: "100%"}}>
        {children}
        <Form.Item {...tailLayout} key="submit">
            <Button type="primary" htmlType="submit" onClick={() => submitHandler()}>
                Submit
            </Button>
        </Form.Item>
    </Space>;
};

export const PSRForm: FunctionComponent<PSRFormProps> = ({submitHandler, children, form}) => {
    return <Form {...layout} name="basic" form={form}>
        {formChildren(children, submitHandler)}
    </Form>
};