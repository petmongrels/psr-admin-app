import {Form, Radio} from 'antd';
import React, {FunctionComponent} from 'react';

type BooleanFormItemProps = {
    label: string,
    formItemName: string,
    onValueChange: (value: boolean) => void,
    value: boolean
};

export const BooleanFormItem: FunctionComponent<BooleanFormItemProps> = ({children, label, formItemName, onValueChange, value}) => {
    return <Form.Item label={label} name={formItemName}>
        <Radio.Group onChange={(e) => {
            onValueChange(e.target.value);
        }} value={value}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
        </Radio.Group>
    </Form.Item>;
};