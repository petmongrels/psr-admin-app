export class ServerResources {
    public static SpringBaseURL = "/api/spring";
    public static PostgrestBaseURL = "/api/postgrest";

    static getResourceBaseURL(resource: string) {
        return `${this.PostgrestBaseURL}/${resource}`;
    }

    static getResourceSaveURL(resource: string) {
        return `${this.SpringBaseURL}/${resource}`;
    }

    static getProofTypesURL() {
        return `${this.PostgrestBaseURL}/proof_type?select=*,proof_type_document_type(id,document_type_id)`;
    }

    static getSingleResourceURL(resource: string, id: string) {
        return `${this.PostgrestBaseURL}/${resource}?id=eq.${id}`;
    }

    static getAggregateResourceURL(resource: string, id: string) {
        return `${this.SpringBaseURL}/${resource}/${id}`;
    }
}