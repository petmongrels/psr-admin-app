import {EntityRelationshipType, PhotographType, ProofType, PSRDocumentType, Service} from "./Service";
import {CommunicationMedium} from "../../master-data/model/CommunicationMedium";
import {ServiceTag} from "../../master-data/model/ServiceTag";

export class ServiceCreateEdit {
    service!: Service;
    communicationMediums!: Array<CommunicationMedium>;
    photographTypes!: Array<PhotographType>;
    documentTypes!: Array<PSRDocumentType>;
    proofTypes!: Array<ProofType>;
    entityRelationshipTypes!: Array<EntityRelationshipType>;
    serviceTags: Array<ServiceTag>;

    static newInstance() {
        let serviceCreateEdit = new ServiceCreateEdit();
        serviceCreateEdit.service = Service.newService();
        serviceCreateEdit.communicationMediums = [];
        serviceCreateEdit.photographTypes = [];
        serviceCreateEdit.documentTypes = [];
        serviceCreateEdit.proofTypes = [];
        serviceCreateEdit.entityRelationshipTypes = [];
        serviceCreateEdit.serviceTags = [];
        return serviceCreateEdit;
    }

    static clone(other: any) {
        let serviceCreateEdit = new ServiceCreateEdit();
        serviceCreateEdit.service = Service.clone(other.service);
        serviceCreateEdit.communicationMediums = other.communicationMediums;
        serviceCreateEdit.photographTypes = other.photographTypes;
        serviceCreateEdit.documentTypes = other.documentTypes;
        serviceCreateEdit.proofTypes = other.proofTypes;
        serviceCreateEdit.entityRelationshipTypes = other.entityRelationshipTypes;
        serviceCreateEdit.serviceTags = other.serviceTags;
        return serviceCreateEdit;
    }

    static toFormValues(serviceCreateEdit: ServiceCreateEdit) {
        let s = serviceCreateEdit.service;
        return {
            name: s.name,
            description: s.description,
            references: s.externalReferences,
        };
    }
}