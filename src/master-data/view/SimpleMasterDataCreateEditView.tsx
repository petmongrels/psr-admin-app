import {Form, Input, Descriptions} from 'antd';
import React, {FunctionComponent, useState} from 'react';
import {PSRLayout} from "../../framework/view/PSRLayout";
import {PSRForm} from "../../framework/view/PSRForm";
import {APIService} from "../../framework/api/APIService";
import {ReferenceEntity} from "../../framework/model/ReferenceEntity";
import TextArea from 'antd/lib/input/TextArea';
import {ServerResources} from "../../framework/routing/ServerResources";

type SimpleMasterDataCreateEditViewProps = {
    initialState: ReferenceEntity,
    entityFactory: () => ReferenceEntity,
    resourceName: string,
    masterDataTitle: string
};

const clone = function (simpleMasterData: ReferenceEntity, entityFactory: () => ReferenceEntity) {
    let clonedSimpleMasterData = entityFactory();
    clonedSimpleMasterData.id = simpleMasterData.id;
    clonedSimpleMasterData.name = simpleMasterData.name;
    clonedSimpleMasterData.description = simpleMasterData.description;
    return clonedSimpleMasterData;
};

export const SimpleMasterDataCreateEditView: FunctionComponent<SimpleMasterDataCreateEditViewProps> = ({children, entityFactory, resourceName, masterDataTitle}) => {
    const [form] = Form.useForm();
    const [simpleMasterData, update] = useState(entityFactory());

    const updateState = function () {
        update(clone(simpleMasterData, entityFactory));
    };

    return <PSRLayout>
        <Descriptions title={`CREATE NEW ${masterDataTitle}`}/>
        <PSRForm submitHandler={() => APIService.save(ServerResources.getResourceBaseURL(resourceName), simpleMasterData)} name="simpleMasterDataCreateEdit" form={form}>
            <Form.Item
                label="Name" name="name"
                rules={[{required: true}]}>
                <Input onChange={(e) => {
                    simpleMasterData.name = e.target.value;
                    updateState();
                }}/>
            </Form.Item>
            <Form.Item label="Description" name="description">
                <TextArea onChange={(e) => {
                    simpleMasterData.description = e.target.value;
                    updateState();
                }} autoSize={{minRows: 2}}/>
            </Form.Item>
        </PSRForm>
    </PSRLayout>;
};