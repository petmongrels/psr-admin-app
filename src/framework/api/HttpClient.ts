export class HttpClient {
    static getJSON(url: string) {
        return fetch(url)
            .then((response) => {
                return response.json();
            });
    }

    static postJSON(url: string, data: object) {
        return fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json", "Prefer": "resolution=merge-duplicates"},
            body: JSON.stringify(data)
        });
    }
}