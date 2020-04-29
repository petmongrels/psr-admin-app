import {HttpClient} from "./HttpClient";

export class APIService {
    public static save(url: string, entity: object) {
        HttpClient.postJSON(url, entity);
    }

    public static loadAll(url: string) {
        return HttpClient.getJSON(url);
    }
}