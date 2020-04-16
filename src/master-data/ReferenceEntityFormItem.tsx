import {Form, Select} from 'antd';
import React, {FunctionComponent} from 'react';
import {ReferenceEntities, ReferenceEntity} from "../framework/model/ReferenceEntity";

const {Option} = Select;

type ReferenceEntityFormItemProps = {
    label: string,
    formItemName: string,
    onReferenceEntityChange: (referenceEntity: ReferenceEntity) => void,
    referenceEntities: Array<ReferenceEntity>
};

export const ReferenceEntityFormItem: FunctionComponent<ReferenceEntityFormItemProps> = ({children, formItemName, onReferenceEntityChange, referenceEntities, label}) => {
    return <Form.Item label={label} name={`${formItemName}`}
                      rules={[{
                          required: true,
                          message: 'This field is mandatory'
                      }]}>
        <Select style={{width: 120}} onChange={(value) => onReferenceEntityChange(ReferenceEntities.findEntityByName(referenceEntities, value.toString()))}>
            {referenceEntities.map((referenceEntity) => <Option value={referenceEntity.name}>{referenceEntity.name}</Option>)}
        </Select>
    </Form.Item>;
};