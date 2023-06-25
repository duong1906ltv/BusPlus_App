import { encode } from 'base-64';
let baseUrl = 'https://api-m.sandbox.paypal.com';


let clientId = 'AVPImteEODTlj0Av7n3iULYaKUy56gfAuhSZnE6oOyN8HJYX3lEf9IO3GXKS9dn2gnM9Db7doA-zNwTH';
let secretKey = 'EA4l8h3OwbJTxQXVtPKWDEO780LFUH79Yk1ZY1nWHiw3ODO3_dMAeqmKKBy0z7kLaIDwliMd5WaFURB_';

const convertDongToDolar = (data) => {
    return Math.round(data / 23000 * 100) / 100
}

const orderDetail = (cost, description) => {
    return {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "items": [
                    {
                        "name": "Buy bus ticket from BusPlus",
                        "description": description,
                        "quantity": "1",
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": cost
                        }
                    }
                ],
                "amount": {
                    "currency_code": "USD",
                    "value": cost,
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": cost
                        }
                    }
                }
            }
        ],
        "application_context": {
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    }
}


const generateToken = () => {
    var headers = new Headers()
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + encode(`${clientId}:${secretKey}`));

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };
    console.log("tokennn", "Basic " + encode(`${clientId}:${secretKey}`));
    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const { access_token } = JSON.parse(result)
            resolve(access_token)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const createOrder = (token = '', cost, description) => {

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify(orderDetail(convertDongToDolar(cost), description))
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}







export default {
    generateToken,
    createOrder,
    capturePayment
}