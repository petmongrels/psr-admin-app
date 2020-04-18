import React, {FunctionComponent} from 'react';
import {Button, Form, Space} from 'antd';

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
    submitHandler: Function,
    onChange: (fields: any) => void,
    fieldData: FieldData[]
};

let formChildren = function (children: React.ReactNode, submitHandler: Function) {
    return <Space direction="vertical" style={{width: "100%"}}>
        {children}
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={() => submitHandler()}>
                Submit
            </Button>
        </Form.Item>
    </Space>;
};

export const PSRForm: FunctionComponent<PSRFormProps> = ({submitHandler, children, fieldData, onChange}) => {
    if (fieldData) {
        return <Form {...layout} name="basic" fields={fieldData} onFieldsChange={(changedFields, allFields) => {
            onChange(allFields);
        }}>
            {formChildren(children, submitHandler)}
        </Form>
    } else {
        return <Form {...layout} name="basic" onFieldsChange={(changedFields, allFields) => {
            onChange(allFields);
        }}>
            {formChildren(children, submitHandler)}
        </Form>
    }
};