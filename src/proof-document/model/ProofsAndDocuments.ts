import {ProofType, PSRDocumentType} from "../../service/model/Service";

export class ProofsAndDocuments {
    documentTypes: PSRDocumentType[];
    proofTypes: ProofType[];

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
        return proofsAndDocuments;
    }
}
