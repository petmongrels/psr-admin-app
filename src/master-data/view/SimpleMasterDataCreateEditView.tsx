import {Form, Input, Descriptions} from 'antd';
import React, {FunctionComponent, useState, useEffect} from 'react';
import {PSRLayout} from "../../framework/view/PSRLayout";
import {PSRForm} from "../../framework/view/PSRForm";
import {APIService} from "../../framework/api/APIService";
import {ReferenceEntity} from "../../framework/model/ReferenceEntity";
import TextArea from 'antd/lib/input/TextArea';
import {ServerResources} from "../../framework/routing/ServerResources";
import {useHistory} from 'react-router-dom';
import {AppResources} from "../../framework/routing/AppResources";
import {ProofTypeService} from "../service/ProofTypeService";
import {ProofsAndDocuments} from "../../proof-document/model/ProofsAndDocuments";

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
    const [saveStatus, saveSuccessful] = useState(false);
    let history = useHistory();

    const updateState = function () {
        update(clone(simpleMasterData, entityFactory));
    };

    if (saveStatus) {
        history.replace(AppResources.getAppURLFor("proofsAndDocuments"));
    }

    return <PSRLayout>
        <Descriptions title={`CREATE NEW ${masterDataTitle}`}/>
        <PSRForm submitHandler={() => {
            APIService.save(ServerResources.getResourceBaseURL(resourceName), simpleMasterData).then(() => {
                saveSuccessful(true);
            });
        }} name="simpleMasterDataCreateEdit" form={form}>
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