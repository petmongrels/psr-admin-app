import {ProofType, PSRDocumentType} from "../../service/model/Service";

export class ProofTypeCreateEdit {
    proofType: ProofType;
    allDocumentTypes: PSRDocumentType[];

    static initialState() {
        let proofTypeCreateEdit = new ProofTypeCreateEdit();
        proofTypeCreateEdit.proofType = ProofType.initialCreateEditState();
        proofTypeCreateEdit.allDocumentTypes = [];
        return proofTypeCreateEdit;
    }

    static clone(other: any) {
        let proofTypeCreateEdit = new ProofTypeCreateEdit();
        proofTypeCreateEdit.proofType = ProofType.clone(other.proofType);
        proofTypeCreateEdit.allDocumentTypes = [...other.allDocumentTypes];
        return proofTypeCreateEdit;
    }

    static updateProofType(proofTypeCreateEdit: ProofTypeCreateEdit, proofTypeResponse: any) {
        proofTypeCreateEdit.proofType = ProofType.fromResponse(proofTypeResponse, proofTypeCreateEdit.allDocumentTypes);
    }
}