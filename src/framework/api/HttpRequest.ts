import _ from 'lodash';

export class HttpRequest {
    url: string;
    body: object;
    method: string;

    constructor(url: string, method: string, body: object) {
        this.url = url;
        this.method = method;
        this.body = body;
    }

    private static getResourceURL(table: string, id: number) {
        return `/${table}?id=eq.${id}`;
    }

    static forSingleUpsert(table: string, id: number, body: object) {
        return new HttpRequest(this.getResourceURL(table, id), "POST", body);
    }

    static forMultipleUpsert(table: string, bodies: any[]) {
        return new HttpRequest(`/${table}`, "POST", bodies);
    }

    static forMultipleDelete(table: string, ids: number[]) {
        let commaSeparatedIds = _.join(ids, ",");
        return new HttpRequest(`/${table}?id=in.(${commaSeparatedIds})`, "DELETE", undefined);
    }

    processor() {
        return () => fetch(this.url, {
            method: this.method,
            headers: {"Content-Type": "application/json", "Prefer": "resolution=merge-duplicates"},
            body: JSON.stringify(this.body)
        });
    }
}