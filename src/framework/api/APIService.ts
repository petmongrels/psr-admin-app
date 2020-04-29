import {HttpClient} from "./HttpClient";

export class APIService {
    public static save(url: string, entity: object) {
        return HttpClient.postJSON(url, entity);
    }

    public static loadAll(url: string) {
        return HttpClient.getJSON(url);
    }

    public static loadOne(url: string) {
        return HttpClient.getJSON(url).then((array) => {
            if (array.length === 1) return array[0];
            throw new Error("No such entity found");
        });
    }
}