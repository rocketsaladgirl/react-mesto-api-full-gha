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
    setUserInfo({ name, about }) { //было setUserInfo(data)
        const token = localStorage.getItem('jwt');
        return fetch(`${this.baseURL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name, //было name: data.name,
                about, //было about: data.about,
            })
        })
        .then(res => this._checkServerResponse(res));
    }

    //метод редактирования аватара пользователя
    setUserAvatar({ avatar }) { //было setUserAvatar(data)
        const token = localStorage.getItem('jwt');
        return fetch(`${this.baseURL}/users/me/avatar`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }, //было this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar, //было avatar: data.avatar
            })
        })
        .then(res => this._checkServerResponse(res));

    }

    // //Метод постановки лайка у карточки
    // putLike(cardId) {
    //     const token = localStorage.getItem('jwt');
        
    //     return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         }, //было this.headers,
    //         method: 'PUT',
    //     })
    //     .then(res => this._checkServerResponse(res));
    // }

    // //Метод удаления лайка
    // deleteLike(cardId) {
    //     const token = localStorage.getItem('jwt');

    //     return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         }, //было this.headers,
    //         method: 'DELETE',
    //     })
    //     .then(res => this._checkServerResponse(res));
    // }
    
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
    baseURL: 'http://localhost:3000', // базовый url, было https://mesto.nomoreparties.co/v1/cohort-60
    //headers: {
       //authorization: '00dc86b0-ecbd-4369-8113-e361344c4b76',
    //   'Content-Type': 'application/json',
    //} - удаляем
 };

const api = new Api(apiConfig);

export default api;