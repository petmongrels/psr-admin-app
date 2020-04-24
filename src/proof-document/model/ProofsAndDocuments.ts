import {ProofType, PSRDocumentType} from "../../service/model/Service";
import {ReferenceEntities} from "../../framework/model/ReferenceEntity";

export class ProofsAndDocuments {
    documentTypes: PSRDocumentType[];
    proofTypes: ProofType[];
    selectedProofTypeName: string;

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
        proofsAndDocuments.selectedProofTypeName = other.selectedProofTypeName;
        return proofsAndDocuments;
    }

    static isProofTypeSelected(proofTypeName: string, proofType: any) {
        return proofType.selectedProofTypeName === proofTypeName;
    }

    static getProofType(proofsAndDocuments: any, proofTypeName: string) {
        return ReferenceEntities.findEntityByName(proofsAndDocuments.proofTypes, proofTypeName);
    }
}
