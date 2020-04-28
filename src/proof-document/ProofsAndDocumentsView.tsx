import React, {FunctionComponent, useEffect, useState} from 'react';
import {PSRLayout} from "../framework/view/PSRLayout";
import {Descriptions, List} from 'antd';
import {PSRResources} from "../framework/routing/PSRResources";
import {ProofsAndDocuments} from "./model/ProofsAndDocuments";
import {Link} from 'react-router-dom';
import {ProofTypeService} from "../master-data/service/ProofTypeService";

export const ProofsAndDocumentsView: FunctionComponent<object> = ({children}) => {
    const [proofsAndDocuments, update] = useState<ProofsAndDocuments>(ProofsAndDocuments.newInstance());

    useEffect(() => {
        ProofTypeService.loadProofTypesAndDocumentTypes(proofsAndDocuments, () => update(ProofsAndDocuments.clone(proofsAndDocuments)));
    }, []);

    return <PSRLayout>
        <Descriptions title="All proof types"/>
        <List
            bordered
            itemLayout="horizontal"
            dataSource={proofsAndDocuments.proofTypes}
            renderItem={item => (
                <List.Item actions={[<Link to={PSRResources.getAppEditURLFor("proofType", ProofsAndDocuments.getProofType(proofsAndDocuments, item.name).id)}>edit</Link>]}
                           style={{
                               backgroundColor: ProofsAndDocuments.isProofTypeSelected(proofsAndDocuments, item.name) ? 'lightblue' : 'lightgrey',
                               paddingLeft: 10,
                               cursor: ProofsAndDocuments.isProofTypeSelected(proofsAndDocuments, item.name) ? "auto" : "pointer"
                           }}
                           onClick={() => {
                               ProofsAndDocuments.updateSelectedProofType(proofsAndDocuments, item.name);
                               update(ProofsAndDocuments.clone(proofsAndDocuments));
                           }}>{item.name}</List.Item>
            )}
        />
        <br/>
        <br/>
        <Descriptions title="All document types"/>
        <List
            bordered
            itemLayout="horizontal"
            dataSource={proofsAndDocuments.documentTypes}
            renderItem={item => (
                <List.Item actions={[<a key="edit">edit</a>]} style={{backgroundColor: 'lightgrey', paddingLeft: 10}}>{item.name}</List.Item>
            )}
        />
    </PSRLayout>;
};