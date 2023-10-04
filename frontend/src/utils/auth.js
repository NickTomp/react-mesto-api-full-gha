class Auth {
    constructor(options) {
        this.options = options
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    register(password, email) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": `${password}`,
                "email": `${email}`
            })
        })
            .then(this._getDataFromResponse)
            
    }
    authorize(password, email) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": `${password}`,
                "email": `${email}`
            })
        })
            .then(this._getDataFromResponse)
    }
    
    validate(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        })
            .then(this._getDataFromResponse)
    }
    _getDataFromResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    }
}
const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
})
export default auth