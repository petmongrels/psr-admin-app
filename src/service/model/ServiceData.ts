export class ServiceData {
    name!: string;
    description!: string;
    references!: string;
    subTypes!: Array<ServiceComponentData>;

    static newInstance() {
        let serviceTypeData = new ServiceData();
        serviceTypeData.subTypes = [];
        return serviceTypeData;
    }

    static clone(other:any) {
        let serviceTypeData = new ServiceData();
        serviceTypeData.name = other.name;
        serviceTypeData.description = other.description;
        serviceTypeData.references = other.references;
        serviceTypeData.subTypes = other.subTypes;
        return serviceTypeData;
    }
}

export class ServiceComponentData {
    name!: string;
    applications!: Array<ApplicationData>;
}

export class ApplicationData {
    name!: string;
    communicationMedium!: CommunicationMediumData;
    communicationAddress!: string;
}

export class CommunicationMediumData {
    name!: string;
}

export class ApplicationFormData {
    name!: string;
    officialFileURL!: string;
    fileURL!: string;
    photographSubmissions!: Array<PhotographSubmission>;
    proofSubmissions!: Array<ProofSubmissionData>;
}

export class PhotographType {
    name!: string;
    description!: string;
}

export class PhotographSubmission {
    crossSignRequired!: boolean;
    numberOfCopies!: number;
    entityRelationshipType!: EntityRelationshipTypeData;
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
}