import {APIService} from "../../framework/api/APIService";
import {ServerResources} from "../../framework/routing/ServerResources";
import {CommunicationMedium} from "../../master-data/model/CommunicationMedium";
import {EntityRelationshipType, ProofType, Service} from "../model/Service";
import {ServiceCreateEdit} from "../model/ServiceCreateEdit";

export class ServiceService {
    static loadAll(serviceCreateEdit: ServiceCreateEdit, cb: Function) {
        const commMediumLoad = APIService.loadAll(ServerResources.getResourceBaseURL("communication_medium")).then((resources) => {
            serviceCreateEdit.communicationMediums = resources.map((resource: any) => CommunicationMedium.fromResource(resource));
        });
        const documentAndProofTypeLoad = APIService.loadAll(ServerResources.getResourceBaseURL("document_type")).then((documentTypes) => {
            serviceCreateEdit.documentTypes = documentTypes;
            return APIService.loadAll(ServerResources.getProofTypesURL()).then((resources) => {
                serviceCreateEdit.proofTypes = resources.map((resource: any) => ProofType.fromResponse(resource, serviceCreateEdit.documentTypes));
            });
        });
        const entityRelTypeLoad = APIService.loadAll(ServerResources.getResourceBaseURL("entity_relationship_type")).then((resources) => {
            serviceCreateEdit.entityRelationshipTypes = resources.map((resource: any) => EntityRelationshipType.fromResource(resource));
        });

        Promise.all([commMediumLoad, documentAndProofTypeLoad, entityRelTypeLoad]).then(() => {
            cb();
        })
    }

    static save(service: Service, cb: Function) {
        APIService.save(ServerResources.getResourceSaveURL("service"), service).then((response) => {
            cb(response);
        });
    }
}