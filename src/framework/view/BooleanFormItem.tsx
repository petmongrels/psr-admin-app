import {Form, Radio} from 'antd';
import React, {FunctionComponent} from 'react';

type BooleanFormItemProps = {
    label: string,
    formItemName: string,
    onValueChange: (value: boolean) => void,
    value: boolean,
    mandatory: boolean
};

export const BooleanFormItem: FunctionComponent<BooleanFormItemProps> = ({children, label, formItemName, onValueChange, value, mandatory}) => {
    return <Form.Item label={label} name={formItemName} rules={[{required: true}]}>
        <Radio.Group onChange={(e) => {
            onValueChange(e.target.value);
        }} value={mandatory}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
        </Radio.Group>
    </Form.Item>;
};