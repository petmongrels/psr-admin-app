export class HttpClient {
    static getJSON(url: string) {
        return fetch(url)
            .then((response) => {
                return response.json();
            });
    }

    static postJSON(url: string, data: object) {
        fetch(url, {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then((response) => response.json());
    }
}