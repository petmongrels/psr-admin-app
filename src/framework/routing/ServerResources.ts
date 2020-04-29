export class ServerResources {
    static getResourceBaseURL(resource: string) {
        return `/${resource}`;
    }

    static getProofTypesURL() {
        return `/proof_type?select=*,proof_type_document_type(id,document_type_id)`;
    }
}