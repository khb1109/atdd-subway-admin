const BASE_URL = "localhost:8080";

const METHOD = {
    PUT() {
        return {
            method: "PUT"
        };
    },
    DELETE() {
        return {
            method: "DELETE"
        };
    },
    POST(data) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    }
};

const api = (() => {
    const request = (uri, config) => fetch(uri, config).then(
        data => data.json());
    const requestNoBody = (uri, config) => fetch(uri, config);

    const line = {
        get(path = "") {
            return request('/api/lines' + path);
        },
        create(data) {
            return requestNoBody(`/api/lines`, METHOD.POST(data));
        },
    };

    const station = {
        get() {
            request(`${BASE_URL}/stations`);
        },
        create(data) {
            request(`${BASE_URL}/station`, METHOD.POST(data));
        },
        update(data) {
            request(`${BASE_URL}/station/${id}`, METHOD.PUT(data));
        },
        delete(id) {
            request(`${BASE_URL}/station/${id}`, METHOD.DELETE);
        }
    };

    return {
        line,
        station
    };
})();

export default api;