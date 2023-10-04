class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getDataFromResponse)
    }
    getCardsArray() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getDataFromResponse)
    }
    editProfileInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
       .then(this._getDataFromResponse)
    }
    deleteCard(card) {
        return fetch(`${this._baseUrl}/cards/${card._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._getDataFromResponse)
    }
    addNewCard(cardLink, cardName) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
        .then(this._getDataFromResponse)
    }
    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._getDataFromResponse)
        }
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._getDataFromResponse)
    }
    editProfileAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${link}`,
            })
        })
        .then(this._getDataFromResponse)
    }
    _getDataFromResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: 'ea3879cb-af90-42ef-bbf7-41be172d27a4',
        'Content-Type': 'application/json'
    }
})
export default api