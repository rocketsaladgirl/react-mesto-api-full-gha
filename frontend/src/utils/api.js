class Api {
    constructor(config) {
        this.headers = config.headers;
        this.baseURL = config.baseURL;

    }
    
    //метод добавления карточек на сервер
    createItem (item) {
         return fetch(`${this.baseURL}/cards`, {
                headers: this.headers,
                method: 'POST',
                body: JSON.stringify({
                        name: item.name,
                        link: item.link
                })
         })
        .then(res => this._checkServerResponse(res));
     }
    
    
    //метод удаления карточки 
    deleteItem(id) {
        return fetch(`${this.baseURL}/cards/${id}`, {
            headers: this.headers,
            method: 'DELETE',
        })
        .then(res => this._checkServerResponse(res));
    }

    //метод получения массива карточек с сервера
    getCardList() {
        return fetch(`${this.baseURL}/cards`, {
                headers: this.headers,
                method: 'GET',
        })
        .then(res => this._checkServerResponse(res));
    }

    //метод проверки ответа от сервера (приватный)
     _checkServerResponse(res) {
        if (res.ok) {
            return res.json();
        }
        //при ошибке отклоняем Promise
        return Promise.reject(`Ошибка в запросе: ${res.status}`)
    }


    //получить данные пользователя
    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {
            headers: this.headers,
            method: 'GET',
        })
        .then(res => this._checkServerResponse(res));
    }

    //редактировать данные пользователя
    setUserInfo(data) {
        return fetch(`${this.baseURL}/users/me`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name, 
                about: data.about,
            })
        })
        .then(res => this._checkServerResponse(res));
    }

    //метод редактирования аватара пользователя
    setUserAvatar(data) {
        return fetch(`${this.baseURL}/users/me/avatar`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.avatar, 
            })
        })
        .then(res => this._checkServerResponse(res));

    }

    //Метод постановки лайка у карточки
    putLike(id) {
        return fetch(`${this.baseURL}/cards/${id}/likes`, {
            headers: this.headers,
            method: 'PUT',
        })
        .then(res => this._checkServerResponse(res));
    }

    //Метод удаления лайка
    deleteLike(id) {
        return fetch(`${this.baseURL}/cards/${id}/likes`, {
            headers: this.headers,
            method: 'DELETE',
        })
        .then(res => this._checkServerResponse(res));

    }

}
//Данные для API-config
const apiConfig = {
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
       authorization: '00dc86b0-ecbd-4369-8113-e361344c4b76',
       'Content-Type': 'application/json'
    }
 };

const api = new Api(apiConfig);

export default api;