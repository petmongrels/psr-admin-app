import {CommunicationMedium} from "../../master-data/model/CommunicationMedium";
import {ReferenceEntities, ReferenceEntity} from "../../framework/model/ReferenceEntity";
import _ from 'lodash';

export class Service {
    id!: number;
    name!: string;
    description!: string;
    externalReferences!: string;
    components!: Array<ServiceComponent>;

    static newService() {
        let service = new Service();
        service.components = [ServiceComponent.newServiceComponent()];
        return service;
    }

    static clone(other: any) {
        let service = new Service();
        service.id = other.id;
        service.name = other.name;
        service.description = other.description;
        service.externalReferences = other.externalReferences;
        service.components = other.components.filter((serviceComponent: any) => ServiceComponent.clone(serviceComponent));
        return service;
    }
}

export class ServiceComponent {
    public static ServerResourceName = 'service_component';

    id!: number;
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
    public static ServerResourceName = 'application';

    id!: number;
    name!: string;
    communicationMedium!: CommunicationMedium;
    communicationAddress!: string;
    applicationForms!: Array<ApplicationForm>;
    photographSubmissions!: Array<PhotographSubmission>;
    proofSubmissions!: Array<ProofSubmission>;

    static newApplication() {
        let application = new Application();
        application.applicationForms = [];
        application.photographSubmissions = [];
        application.proofSubmissions = [];
        return application;
    }

    static clone(other: any) {
        let application = new Application();
        application.id = other.id;
        application.name = other.name;
        application.communicationMedium = other.communicationMedium;
        application.communicationAddress = other.communicationAddress;
        application.applicationForms = other.applicationForms.filter((value: any) => ApplicationForm.clone(value));
        application.photographSubmissions = other.photographSubmissions.filter((value: PhotographSubmission) => PhotographSubmission.clone(value));
        application.proofSubmissions = other.proofSubmissions.filter((value: any) => ProofSubmission.clone(value));
        return application;
    }

    static removePhotographSubmission(application: Application, photographSubmission: PhotographSubmission) {
        _.remove(application.photographSubmissions, (item) => item === photographSubmission);
    }

    static removeProofSubmission(application: Application, proofSubmission: ProofSubmission) {
        _.remove(application.proofSubmissions, (item) => item === proofSubmission);
    }
}

export class ApplicationForm {
    public static ServerResourceName = 'application_form';

    id!: number;
    name!: string;
    officialFileURL!: string;
    blankFormLocation!: string;
    formSchema: object;

    static newInstance() {
        let applicationForm = new ApplicationForm();
        applicationForm.formSchema = {};
        return applicationForm;
    }

    static clone(other: any) {
        let applicationForm = new ApplicationForm();
        applicationForm.id = other.id;
        applicationForm.name = other.name;
        applicationForm.officialFileURL = other.officialFileURL;
        applicationForm.blankFormLocation = other.blankFormLocation;
        applicationForm.formSchema = other.formSchema;
        return applicationForm;
    }
}

export class PhotographType implements ReferenceEntity {
    id!: number;
    name!: string;
    description!: string;
}

export class PhotographSubmission {
    id!: number;
    photographType!: PhotographType;
    crossSignRequired!: boolean;
    numberOfCopies!: number;
    entityRelationshipType!: EntityRelationshipType;

    static clone(other: any) {
        let photographSubmission = new PhotographSubmission();
        photographSubmission.id = other.id;
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
    id!: number;
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
        let proofTypeDocumentTypes = ReferenceEntities.findEntitiesById(referenceDocumentTypes, proofTypeResponse["proof_type_document_type"].map((proofTypeDocumentType: any) => proofTypeDocumentType["document_type_id"]));
        return ProofType.newInstance({
            id: proofTypeResponse["id"],
            name: proofTypeResponse["name"],
            description: proofTypeResponse["description"],
            documentTypes: proofTypeDocumentTypes
        } as ProofType);
    }

    static initialCreateEditState() {
        return ProofType.newInstance({documentTypes: []} as ProofType);
    }

    static getOneURL(id: string) {
        return `/proof_type?id=eq.${id}&select=*,proof_type_document_type(id,document_type_id)`;
    }
}

export class PSRDocumentType implements ReferenceEntity {
    static DOCUMENT_TYPE = "document_type";

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