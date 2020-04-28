import {ProofType, PSRDocumentType} from "../../service/model/Service";
import {ReferenceEntities} from "../../framework/model/ReferenceEntity";
import _ from 'lodash';

export class ProofsAndDocuments {
    documentTypes: PSRDocumentType[];
    proofTypes: ProofType[];
    selectedProofType: ProofType;

    static newInstance() {
        let proofsAndDocuments = new ProofsAndDocuments();
        proofsAndDocuments.proofTypes = [];
        proofsAndDocuments.documentTypes = [];
        return proofsAndDocuments;
    }

    static clone(other: any) {
        let proofsAndDocuments = new ProofsAndDocuments();
        proofsAndDocuments.documentTypes = [...other.documentTypes];
        proofsAndDocuments.proofTypes = [...other.proofTypes];
        proofsAndDocuments.selectedProofType = other.selectedProofType;
        return proofsAndDocuments;
    }

    static isProofTypeSelected(proofsAndDocuments: ProofsAndDocuments, proofTypeName: string) {
        return proofsAndDocuments.selectedProofType && proofsAndDocuments.selectedProofType.name === proofTypeName;
    }

    static getProofType(proofsAndDocuments: any, proofTypeName: string) {
        return ReferenceEntities.findEntityByName(proofsAndDocuments.proofTypes, proofTypeName);
    }

    static updateSelectedProofType(proofsAndDocuments: ProofsAndDocuments, proofTypeName: string) {
        proofsAndDocuments.selectedProofType = _.find(proofsAndDocuments.proofTypes, (proofType) => proofType.name === proofTypeName);
    }
}
