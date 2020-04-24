import React, {FunctionComponent, useEffect, useState} from 'react';
import {PSRLayout} from "../framework/view/PSRLayout";
import {List, Descriptions} from 'antd';
import {APIService} from "../framework/api/APIService";
import {PSRResources} from "../framework/routing/PSRResources";
import {ProofType, PSRDocumentType} from "../service/model/Service";
import {ProofsAndDocuments} from "./model/ProofsAndDocuments";
import {Link} from 'react-router-dom';

export const ProofsAndDocumentsView: FunctionComponent<object> = ({children}) => {
    const [proofsAndDocuments, update] = useState<ProofsAndDocuments>(ProofsAndDocuments.newInstance());

    useEffect(() => {
        APIService.loadAll(PSRResources.getResourceListURL("document_type")).then((resources) => {
            proofsAndDocuments.documentTypes = resources.map((resource: any) => PSRDocumentType.fromResource(resource));
            update(ProofsAndDocuments.clone(proofsAndDocuments));
        });
        APIService.loadAll(PSRResources.getResourceListURL("proof_type")).then((resources) => {
            proofsAndDocuments.proofTypes = resources.map((resource: any) => ProofType.fromResource(resource));
            update(ProofsAndDocuments.clone(proofsAndDocuments));
        });
    }, []);

    return <PSRLayout>
        <Descriptions title="All proof types"/>
        <List
            bordered
            itemLayout="horizontal"
            dataSource={proofsAndDocuments.proofTypes}
            renderItem={item => (
                <List.Item actions={[<Link to={PSRResources.getEditURLFor("proof_type", ProofsAndDocuments.getProofType(proofsAndDocuments, item.name).id)}>edit</Link>]}
                           style={{
                               backgroundColor: ProofsAndDocuments.isProofTypeSelected(item.name, proofsAndDocuments) ? 'lightblue' : 'lightgrey',
                               paddingLeft: 10,
                               cursor: ProofsAndDocuments.isProofTypeSelected(item.name, proofsAndDocuments) ? "auto" : "pointer"
                           }}
                           onClick={() => {
                               proofsAndDocuments.selectedProofTypeName = item.name;
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