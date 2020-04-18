import {CommunicationMedium} from "../../master-data/model/CommunicationMedium";
import {ReferenceEntity} from "../../framework/model/ReferenceEntity";

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

    static clone(other: Service) {
        let service = new Service();
        service.name = other.name;
        service.description = other.description;
        service.references = other.references;
        service.components = other.components.filter((serviceComponent:any) => ServiceComponent.clone(serviceComponent));
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

    static clone(serviceComponent: ServiceComponent) {
        let serviceComponentData = new ServiceComponent();
        serviceComponentData.applications = serviceComponent.applications.filter(value => Application.clone(value));
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

    static clone(other: Application) {
        let application = new Application();
        application.name = other.name;
        application.communicationMedium = CommunicationMedium.clone(other.communicationMedium);
        application.communicationAddress = other.communicationAddress;
        application.applicationForms = other.applicationForms.filter(value => ApplicationForm.clone(value));
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

    static clone(other: ApplicationForm) {
        let applicationForm = new ApplicationForm();
        applicationForm.name = other.name;
        applicationForm.officialFileURL = other.officialFileURL;
        applicationForm.fileURL = other.fileURL;
        applicationForm.photographSubmissions = other.photographSubmissions.filter(value => PhotographSubmission.clone(value));
        applicationForm.proofSubmissions = other.proofSubmissions.filter(value => ProofSubmission.clone(value));
        return applicationForm;
    }
}

export class PhotographType implements ReferenceEntity {
    name!: string;
    description!: string;
}

export class PhotographSubmission {
    photographType!: PhotographType;
    crossSignRequired!: boolean;
    numberOfCopies!: number;
    entityRelationshipType!: EntityRelationshipType;

    static clone(other: PhotographSubmission) {
        let photographSubmission = new PhotographSubmission();
        photographSubmission.numberOfCopies = other.numberOfCopies;
        photographSubmission.entityRelationshipType = other.entityRelationshipType;
        photographSubmission.crossSignRequired = other.crossSignRequired;
        photographSubmission.photographType = other.photographType;
        return photographSubmission;
    }

    static newInstance() {
        return new PhotographSubmission();
    }
}

export class EntityRelationshipType implements ReferenceEntity {
    name!: string;
    description: string;
}

export class ProofSubmission {
    name!: string;
    entityRelationshipType!: EntityRelationshipType;
    proofType!: ProofType;
    originalToBeShown!: boolean;
    numberOfCopies!: number;
    proofDocuments!: Array<ProofDocument>;

    static clone(other: ProofSubmission) {
        let proofSubmission = new ProofSubmission();
        proofSubmission.name = other.name;
        proofSubmission.proofType = other.proofType;
        proofSubmission.originalToBeShown = other.originalToBeShown;
        proofSubmission.proofDocuments = other.proofDocuments.filter(value => ProofDocument.clone(value));
        return proofSubmission;
    }

    static newInstance() {
        let proofSubmission = new ProofSubmission();
        proofSubmission.proofDocuments = [];
        return proofSubmission;
    }
}

export class ProofType implements ReferenceEntity {
    name!: string;
    description: string;
}

export class PSRDocumentType implements ReferenceEntity {
    name!: string;
    description: string;
}

export class ProofDocument {
    documentType!: PSRDocumentType;
    condition!: string;

    static clone(value: ProofDocument) {
        let proofDocument = new ProofDocument();
        proofDocument.documentType = value.documentType;
        proofDocument.condition = value.condition;
        return proofDocument;
    }

    static newInstance() {
        return new ProofDocument();
    }
}