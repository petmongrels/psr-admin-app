import {Form, Select} from 'antd';
import React, {FunctionComponent} from 'react';
import {ReferenceEntities, ReferenceEntity} from "../framework/model/ReferenceEntity";

const {Option} = Select;

type ReferenceEntitiesFormItemProps = {
    label: string,
    formItemName: string,
    onReferenceEntitiesChange: (referenceEntity: ReferenceEntity[]) => void,
    referenceEntities: Array<ReferenceEntity>
};

export const ReferenceEntitiesFormItem: FunctionComponent<ReferenceEntitiesFormItemProps> = ({children, formItemName, onReferenceEntitiesChange, referenceEntities, label}) => {
    return <Form.Item label={label} name={`${formItemName}`}
                      rules={[{required: true}]}>
        <Select style={{width: 120}} mode="multiple" placeholder="Please select"
                onChange={(values) => {
                    console.log(values);
                    // onReferenceEntitiesChange(ReferenceEntities.findEntitiesByName(referenceEntities, values))
                }}>
            {referenceEntities.map((referenceEntity, index) => <Option key={`${formItemName}.${index}`} value={referenceEntity.name}>{referenceEntity.name}</Option>)}
        </Select>
    </Form.Item>;
};