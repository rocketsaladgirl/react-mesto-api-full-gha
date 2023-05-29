class Api {
    constructor(config) {
        //this.headers = config.headers; - удаляем
        this.baseURL = config.baseURL;

    }
    
    //метод добавления карточек на сервер
    createItem ({ name, link }) { //было createItem (item)
        const token = localStorage.getItem('jwt');

        return fetch(`${this.baseURL}/cards`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
            method: 'POST',
            body: JSON.stringify({
                name, // было name: item.name,
                link, // было link: item.link
            })
        })
        .then(res => this._checkServerResponse(res));
     }
    
    
    //метод удаления карточки 
    deleteItem(cardId) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this.baseURL}/cards/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
            method: 'DELETE',
        })
        .then(res => this._checkServerResponse(res));
    }

    //метод получения массива карточек с сервера
    getCardList() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this.baseURL}/cards`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
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
        const token = localStorage.getItem('jwt');
        return fetch(`${this.baseURL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
            method: 'GET',
        })
        .then(res => this._checkServerResponse(res));
    }

    //редактировать данные пользователя
    setUserInfo({ name, about }) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this.baseURL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name,
                about,
            })
        })
        .then(res => this._checkServerResponse(res));
    }

    //метод редактирования аватара пользователя
    setUserAvatar({ avatar }) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this.baseURL}/users/me/avatar`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar,
            })
        })
        .then(res => this._checkServerResponse(res));

    }
    
    //Метод постановки и удаления лайка у карточки
    changeLike(cardId, isLiked) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
        })
        .then(res => this._checkServerResponse(res));
    }

}
//Данные для API-config
const apiConfig = {
    baseURL: 'https://api.rocketsaladgirl.nomoredomains.monster', // базовый url, было http://localhost:3000
};

const api = new Api(apiConfig);

export default api;