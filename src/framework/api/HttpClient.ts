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
}