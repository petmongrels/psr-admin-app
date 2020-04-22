import React, {FunctionComponent, useEffect, useState} from 'react';
import {PSRLayout} from "../framework/view/PSRLayout";
import {List} from 'antd';
import {APIService} from "../framework/api/APIService";
import {PSRResources} from "../framework/routing/PSRResources";
import {ProofType, PSRDocumentType} from "../service/model/Service";

class ProofsAndDocuments {
    documentTypes: PSRDocumentType[];
    proofTypes: ProofType[];

    static clone(other: any) {
        let proofsAndDocuments = new ProofsAndDocuments();
        proofsAndDocuments.documentTypes = [...other.documentTypes];
        proofsAndDocuments.proofTypes = [...other.proofTypes];
        return proofsAndDocuments;
    }
}

export const ProofsAndDocumentsView: FunctionComponent<object> = ({children}) => {
    const [proofsAndDocuments, update] = useState<ProofsAndDocuments>(new ProofsAndDocuments());

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
        <List
            itemLayout="horizontal"
            dataSource={proofsAndDocuments.proofTypes}
            renderItem={item => (
                <List.Item actions={[<a key="edit">edit</a>]}>
                    <List.Item.Meta
                        title={<a href="https://ant.design">{item.name}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    </PSRLayout>;
};