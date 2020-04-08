export class ServiceData {
    name!: string;
    description!: string;
    references!: string;
    components!: Array<ServiceComponentData>;

    static newService() {
        let serviceTypeData = new ServiceData();
        serviceTypeData.components = [ServiceComponentData.newServiceComponent()];
        return serviceTypeData;
    }

    static clone(other: ServiceData) {
        let serviceData = new ServiceData();
        serviceData.name = other.name;
        serviceData.description = other.description;
        serviceData.references = other.references;
        serviceData.components = other.components.filter((serviceComponent:any) => ServiceComponentData.clone(serviceComponent));
        return serviceData;
    }
}

export class ServiceComponentData {
    name!: string;
    applications!: Array<ApplicationData>;

    static newServiceComponent() {
        let serviceComponentData = new ServiceComponentData();
        serviceComponentData.applications = [ApplicationData.newApplication()];
        return serviceComponentData;
    }

    static clone(serviceComponent: ServiceComponentData) {
        let serviceComponentData = new ServiceComponentData();
        serviceComponentData.applications = serviceComponent.applications.filter(value => ApplicationData.clone(value));
        return serviceComponentData;
    }
}

export class ApplicationData {
    name!: string;
    communicationMedium!: CommunicationMediumData;
    communicationAddress!: string;
    applicationForms!: Array<ApplicationFormData>;

    static newApplication() {
        let applicationData = new ApplicationData();
        applicationData.applicationForms = [];
        return applicationData;
    }

    static clone(other: ApplicationData) {
        let applicationData = new ApplicationData();
        applicationData.name = other.name;
        applicationData.communicationMedium = CommunicationMediumData.clone(other.communicationMedium);
        applicationData.communicationAddress = other.communicationAddress;
        applicationData.applicationForms = other.applicationForms.filter(value => ApplicationFormData.clone(value));
        return applicationData;
    }
}

export class CommunicationMediumData {
    name!: string;

    static clone(other: CommunicationMediumData) {
        let communicationMediumData = new CommunicationMediumData();
        communicationMediumData.name = other.name;
        return communicationMediumData;
    }
}

export class ApplicationFormData {
    name!: string;
    officialFileURL!: string;
    fileURL!: string;
    photographSubmissions!: Array<PhotographSubmission>;
    proofSubmissions!: Array<ProofSubmissionData>;

    static clone(other: ApplicationFormData) {
        let applicationFormData = new ApplicationFormData();
        applicationFormData.name = other.name;
        applicationFormData.officialFileURL = other.officialFileURL;
        applicationFormData.fileURL = other.fileURL;
        applicationFormData.photographSubmissions = other.photographSubmissions.filter(value => PhotographSubmission.clone(value));
        applicationFormData.proofSubmissions = other.proofSubmissions.filter(value => ProofSubmissionData.clone(value));
        return undefined;
    }
}

export class PhotographType {
    name!: string;
    description!: string;
}

export class PhotographSubmission {
    crossSignRequired!: boolean;
    numberOfCopies!: number;
    entityRelationshipType!: EntityRelationshipTypeData;

    static clone(other: PhotographSubmission) {
        let photographSubmission = new PhotographSubmission();
        photographSubmission.numberOfCopies = other.numberOfCopies;
        photographSubmission.entityRelationshipType = other.entityRelationshipType;
        photographSubmission.crossSignRequired = other.crossSignRequired;
        return photographSubmission;
    }
}

export class EntityRelationshipTypeData {
    name!: string;
}

export class ProofSubmissionData {
    name!: string;
    entityRelationshipType!: EntityRelationshipTypeData;
    proofType!: ProofTypeData;
    originalToBeShown!: boolean;
    numberOfCopies!: number;
    proofDocuments!: Array<ProofDocumentData>;

    static clone(other: ProofSubmissionData) {
        let proofSubmissionData = new ProofSubmissionData();
        proofSubmissionData.name = other.name;
        proofSubmissionData.proofType = other.proofType;
        proofSubmissionData.originalToBeShown = other.originalToBeShown;
        proofSubmissionData.proofDocuments = other.proofDocuments.filter(value => ProofDocumentData.clone(value));
        return proofSubmissionData;
    }
}

export class ProofTypeData {
    name!: string;
}

export class DocumentTypeData {
    name!: string;
}

export class ProofDocumentData {
    documentType!: DocumentTypeData;
    condition!: string;

    static clone(value: ProofDocumentData) {
        let proofDocumentData = new ProofDocumentData();
        proofDocumentData.documentType = value.documentType;
        proofDocumentData.condition = value.condition;
        return proofDocumentData;
    }
}