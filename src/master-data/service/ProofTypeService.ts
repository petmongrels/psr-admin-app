import {APIService} from "../../framework/api/APIService";
import {ProofType} from "../../service/model/Service";
import {ProofTypeCreateEdit} from "../model/ProofTypeCreateEdit";
import {ManyToManyMap, ManyToManyMapping} from "../../framework/api/ManyToManyMap";
import {HttpRequest} from "../../framework/api/HttpRequest";

const proofTypeDocumentTypeTable = "proof_type_document_type";
const documentTypeId = "document_type_id";

export class ProofTypeService {
    static loadForProofTypeCreateEdit(proofTypeCreateEdit: ProofTypeCreateEdit, proofTypeId: string, cb: Function) {
        APIService.loadAll(`/document_type`).then((documentTypesResponse) => {
            proofTypeCreateEdit.allDocumentTypes = documentTypesResponse;
            APIService.loadAll(ProofType.getOneURL(proofTypeId)).then((proofTypesResponse) => {
                let proofType = proofTypesResponse[0];
                ProofTypeCreateEdit.updateProofType(proofTypeCreateEdit, proofType);
                ManyToManyMap.getInstance().clearMapping(proofTypeDocumentTypeTable);
                ManyToManyMap.getInstance().addMappings(proofType[proofTypeDocumentTypeTable].map((proofTypeDocumentType: any) => new ManyToManyMapping(proofTypeDocumentTypeTable, proofTypeDocumentType)));
                cb();
            });
        });
    }

    static async saveProofType(proofType: ProofType) {
        let currentDocumentTypeIds = proofType.documentTypes.map((documentType) => documentType.id);
        let newDocumentTypeIds = ManyToManyMap.getInstance().newFieldIds(proofTypeDocumentTypeTable, documentTypeId, currentDocumentTypeIds);
        let newProofTypeDocumentTypes = newDocumentTypeIds.map((newDocumentTypeId) => new ProofTypeDocumentType(undefined, proofType.id, newDocumentTypeId));
        let removedProofTypeDocumentTypeIds = ManyToManyMap.getInstance().removedObjectIds(proofTypeDocumentTypeTable, documentTypeId, currentDocumentTypeIds);

        let httpRequests = [HttpRequest.forSingleUpsert("proof_type", proofType.id, {
            "id": proofType.id,
            "name": proofType.name
        }), HttpRequest.forMultipleUpsert(proofTypeDocumentTypeTable, newProofTypeDocumentTypes),
            HttpRequest.forMultipleDelete(proofTypeDocumentTypeTable, removedProofTypeDocumentTypeIds)];

        let processors = httpRequests.map((httpRequest) => httpRequest.processor());
        await Promise.all(processors);
    }
}

class ProofTypeDocumentType {
    id: number;
    proof_type_id: number;
    document_type_id: number;

    constructor(id: number, proof_type_id: number, document_type_id: number) {
        this.id = id;
        this.proof_type_id = proof_type_id;
        this.document_type_id = document_type_id;
    }
}