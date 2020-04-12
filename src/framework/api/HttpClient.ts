export class HttpClient {
    getJSON(url: string) {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }

    postJSON(url: string, data: object) {
        fetch(url, {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then((response) => response.json());
    }
}