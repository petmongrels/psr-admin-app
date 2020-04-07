class HttpClient {
    getJSON(url) {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }
}