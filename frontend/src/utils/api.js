import { BASE_URL, HEADERS } from "./config";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

//делаю обертку вокруг fetch чтобы в разных запросах можно было использовать, url базовый статичный, меняется только endpoint в этом api
export function request(endpoint, options) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

//обновление данных статистики
export function getStatistics() {
    return fetch(`${BASE_URL}/statistics`, {
        method: "GET",
        headers: HEADERS,
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to fetch statistics: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .catch((error) => {
            console.error("Error fetching statistics:", error);
            throw error; // Rethrow the error to propagate it to the calling code
        });
}

//получение товаров
export function getProducts() {
    return fetch(`${BASE_URL}/all-products`, {
        method: "GET",
        headers: HEADERS,
    }).then(res => checkResponse(res));
}

//отправка товаров
export const sendOrder = (product_key) => {
    return request(`/all-products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            products: product_key,
        }),
    });
};