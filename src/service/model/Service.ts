import {CommunicationMedium} from "../../master-data/model/CommunicationMedium";
import {ReferenceEntities, ReferenceEntity} from "../../framework/model/ReferenceEntity";
import _ from 'lodash';

export class Service {
    name!: string;
    description!: string;
    references!: string;
    components!: Array<ServiceComponent>;

    static newService() {
        let service = new Service();
        service.components = [ServiceComponent.newServiceComponent()];
        return service;
    }

    static clone(other: any) {
        let service = new Service();
        service.name = other.name;
        service.description = other.description;
        service.references = other.references;
        service.components = other.components.filter((serviceComponent: any) => ServiceComponent.clone(serviceComponent));
        return service;
    }
}

export class ServiceComponent {
    name!: string;
    applications!: Array<Application>;

    static newServiceComponent() {
        let serviceComponent = new ServiceComponent();
        serviceComponent.applications = [Application.newApplication()];
        return serviceComponent;
    }

    static clone(serviceComponent: any) {
        let serviceComponentData = new ServiceComponent();
        serviceComponentData.applications = serviceComponent.applications.filter((value: any) => Application.clone(value));
        return serviceComponentData;
    }
}

export class Application {
    name!: string;
    communicationMedium!: CommunicationMedium;
    communicationAddress!: string;
    applicationForms!: Array<ApplicationForm>;

    static newApplication() {
        let application = new Application();
        application.applicationForms = [];
        return application;
    }

    static clone(other: any) {
        let application = new Application();
        application.name = other.name;
        application.communicationMedium = CommunicationMedium.clone(other.communicationMedium);
        application.communicationAddress = other.communicationAddress;
        application.applicationForms = other.applicationForms.filter((value: any) => ApplicationForm.clone(value));
        return application;
    }
}

export class ApplicationForm {
    name!: string;
    officialFileURL!: string;
    fileURL!: string;
    photographSubmissions!: Array<PhotographSubmission>;
    proofSubmissions!: Array<ProofSubmission>;

    static newInstance() {
        let applicationForm = new ApplicationForm();
        applicationForm.photographSubmissions = [];
        applicationForm.proofSubmissions = [];
        return applicationForm;
    }

    static clone(other: any) {
        let applicationForm = new ApplicationForm();
        applicationForm.name = other.name;
        applicationForm.officialFileURL = other.officialFileURL;
        applicationForm.fileURL = other.fileURL;
        applicationForm.photographSubmissions = other.photographSubmissions.filter((value: PhotographSubmission) => PhotographSubmission.clone(value));
        applicationForm.proofSubmissions = other.proofSubmissions.filter((value: any) => ProofSubmission.clone(value));
        return applicationForm;
    }

    static removePhotographSubmission(applicationForm: ApplicationForm, photographSubmission: PhotographSubmission) {
        _.remove(applicationForm.photographSubmissions, (item) => item === photographSubmission);
    }

    static removeProofSubmission(applicationForm: ApplicationForm, proofSubmission: ProofSubmission) {
        _.remove(applicationForm.proofSubmissions, (item) => item === proofSubmission);
    }
}

export class PhotographType implements ReferenceEntity {
    id!: number;
    name!: string;
    description!: string;
}

export class PhotographSubmission {
    photographType!: PhotographType;
    crossSignRequired!: boolean;
    numberOfCopies!: number;
    entityRelationshipTypes!: EntityRelationshipType[];

    static clone(other: any) {
        let photographSubmission = new PhotographSubmission();
        photographSubmission.numberOfCopies = other.numberOfCopies;
        photographSubmission.entityRelationshipTypes = other.entityRelationshipTypes;
        photographSubmission.crossSignRequired = other.crossSignRequired;
        photographSubmission.photographType = other.photographType;
        return photographSubmission;
    }

    static newInstance() {
        return new PhotographSubmission();
    }
}

export class EntityRelationshipType implements ReferenceEntity {
    id!: number;
    name!: string;
    description: string;

    static newInstance(id: number, name: string, description: string) {
        let entityRelationshipType = new EntityRelationshipType();
        entityRelationshipType.id = id;
        entityRelationshipType.name = name;
        entityRelationshipType.description = description;
        return entityRelationshipType;
    }

    static fromResource(resource: any) {
        return EntityRelationshipType.newInstance(resource["id"], resource["name"], resource["description"]);
    }
}

export class ProofSubmission {
    entityRelationshipType!: EntityRelationshipType;
    proofType!: ProofType;
    originalToBeShown!: boolean;
    numberOfCopies!: number;
    proofDocuments!: Array<PSRDocumentType>;
    reason!: string;

    static clone(other: any) {
        let proofSubmission = new ProofSubmission();
        proofSubmission.reason = other.reason;
        proofSubmission.proofType = other.proofType;
        proofSubmission.originalToBeShown = other.originalToBeShown;
        proofSubmission.proofDocuments = [...other.proofDocuments];
        return proofSubmission;
    }

    static newInstance() {
        let proofSubmission = new ProofSubmission();
        proofSubmission.proofDocuments = [];
        return proofSubmission;
    }
}

export class ProofType implements ReferenceEntity {
    id!: number;
    name!: string;
    description: string;
    documentTypes: PSRDocumentType[];

    static newInstance({id, name, description, documentTypes}: ProofType) {
        let proofType = new ProofType();
        proofType.id = id;
        proofType.name = name;
        proofType.description = description;
        proofType.documentTypes = [...documentTypes];
        return proofType;
    }

    static clone(other: any) {
        return this.newInstance({id: other.id, name: other.name, description: other.description, documentTypes: other.documentTypes});
    }

    static fromResponse(proofTypeResponse: any, referenceDocumentTypes: PSRDocumentType[]) {
        let proofTypeDocumentTypes = ReferenceEntities.findEntitiesById(referenceDocumentTypes, proofTypeResponse["document_type"].map((documentTypeResponse: any) => documentTypeResponse["id"]));
        return ProofType.newInstance({
            id: proofTypeResponse["id"],
            name: proofTypeResponse["name"],
            description: proofTypeResponse["description"],
            documentTypes: proofTypeDocumentTypes
        } as ProofType);
    }

    static toRequest(proofType: ProofType) {

    }

    static initialCreateEditState() {
        return ProofType.newInstance({documentTypes: []} as ProofType);
    }
}

export class PSRDocumentType implements ReferenceEntity {
    id!: number;
    name!: string;
    description: string;

    static newInstance(id: number, name: string, description: string) {
        let psrDocumentType = new PSRDocumentType();
        psrDocumentType.id = id;
        psrDocumentType.name = name;
        psrDocumentType.description = description;
        return psrDocumentType;
    }

    static clone(other: any) {
        return this.newInstance(other.id, other.name, other.description);
    }

    static fromResource(resource: any) {
        return PSRDocumentType.newInstance(resource["id"], resource["name"], resource["description"]);
    }
}