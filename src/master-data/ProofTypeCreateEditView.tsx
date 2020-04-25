import React, {FunctionComponent, useEffect, useState} from 'react';
import {Form, Input, Select, Descriptions} from 'antd';

import {PSRLayout} from "../framework/view/PSRLayout";
import {PSRForm} from "../framework/view/PSRForm";
import {APIService} from "../framework/api/APIService";
import {useParams} from 'react-router-dom';
import {ReferenceEntities} from "../framework/model/ReferenceEntity";
import {ProofTypeCreateEdit} from "./model/ProofTypeCreateEdit";
import {ProofType} from "../service/model/Service";

const {Option} = Select;

const submit = function (proofType: ProofType) {
    ProofType.toRequest(proofType);
    APIService.save(`/proof_type?id=eq.${proofType.id}`, proofType);
};

export const ProofTypeCreateEditView: FunctionComponent<any> = ({children}) => {
    const [form] = Form.useForm();
    let {id} = useParams();
    const [proofTypeCreateEdit, update] = useState<ProofTypeCreateEdit>(ProofTypeCreateEdit.initialState());

    const updateState = function () {
        update(ProofTypeCreateEdit.clone(proofTypeCreateEdit));
    };

    useEffect(() => {
        APIService.loadAll(`/document_type`).then((documentTypesResponse) => {
            proofTypeCreateEdit.allDocumentTypes = documentTypesResponse;
            APIService.loadAll(`/proof_type?id=eq.${id}&select=*,document_type(id)`).then((proofTypesResponse) => {
                ProofTypeCreateEdit.updateProofType(proofTypeCreateEdit, proofTypesResponse[0]);
                form.setFieldsValue({
                    name: proofTypeCreateEdit.proofType.name,
                    documentTypes: proofTypeCreateEdit.proofType.documentTypes.map((documentType) => documentType.name)
                });
                updateState();
            });
        });

    }, []);

    return <PSRLayout>
        <Descriptions title="Proof Type"/>
        <PSRForm name="proofTypeCreateEdit" form={form} submitHandler={() => submit(proofTypeCreateEdit.proofType)}>
            <Form.Item label="Name" name="name" rules={[{required: true}]} key="name">
                <Input onChange={(e) => {
                    proofTypeCreateEdit.proofType.name = e.target.value;
                    updateState();
                }}/>
            </Form.Item>
            <Form.Item label="Document types" name="documentTypes" key="documentTypes">
                <Select mode="multiple" style={{width: '100%'}} placeholder="Please select" onChange={(values) => {
                    proofTypeCreateEdit.proofType.documentTypes = values.map((value: any) => ReferenceEntities.findEntityByName(proofTypeCreateEdit.allDocumentTypes, value));
                    updateState();
                }
                } value={proofTypeCreateEdit.proofType.documentTypes.map((documentType) => documentType.name)}>
                    {proofTypeCreateEdit.allDocumentTypes.map((documentType) => <Option value={documentType.name}
                                                                                        key={`documentTypes.${documentType.name}}`}>{documentType.name}</Option>)}
                </Select>
            </Form.Item>
        </PSRForm>
    </PSRLayout>;
};