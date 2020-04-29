import {Descriptions, Form, Input} from 'antd';
import React, {FunctionComponent, useState, useEffect} from 'react';
import {PSRLayout} from "../../framework/view/PSRLayout";
import {PSRForm} from "../../framework/view/PSRForm";
import {APIService} from "../../framework/api/APIService";
import {ReferenceEntity} from "../../framework/model/ReferenceEntity";
import TextArea from 'antd/lib/input/TextArea';
import {ServerResources} from "../../framework/routing/ServerResources";
import {useHistory, useParams} from 'react-router-dom';
import {AppResources} from "../../framework/routing/AppResources";
import {ProofsAndDocuments} from "../../proof-document/model/ProofsAndDocuments";
import {ProofTypeService} from "../service/ProofTypeService";

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
    const [simpleMasterData, update] = useState<ReferenceEntity>(entityFactory());
    const [pageExited, exitPage] = useState<boolean>(false);
    const history = useHistory();
    const {id} = useParams();

    const updateState = function () {
        update(clone(simpleMasterData, entityFactory));
    };

    if (pageExited) {
        history.replace(AppResources.getCustomPath(ProofsAndDocuments.APP_RESOURCE_NAME));
    }

    useEffect(() => {
        if (id) {
            APIService.loadOne(ServerResources.getSingleResourceURL(resourceName, id)).then((entity) => {
                let clonedEntity = clone(entity, entityFactory);
                form.setFieldsValue({
                    name: clonedEntity.name,
                    description: clonedEntity.description
                });
                update(clonedEntity);
            });
        }
    }, []);

    return <PSRLayout>
        <Descriptions title={id ? `Update ${masterDataTitle}` : `Create new ${masterDataTitle}`}/>
        <PSRForm submitHandler={() => {
            APIService.save(ServerResources.getResourceBaseURL(resourceName), simpleMasterData).then(() => exitPage(true));
        }} cancelHandler={() => exitPage(true)} name="simpleMasterDataCreateEdit" form={form}>
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