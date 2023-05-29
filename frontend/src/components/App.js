import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth'; //импортируем файл auth
import ProtectedRoute from './ProtectedRoute'; //импортируем ProtectedRoute

import resolve from '../images/logo/resolve_icon.svg'; //импортируем изображения с галочкой
import reject from '../images/logo/reject_icon.svg';//импортируем изображение с крестиком


function App() {
    const navigate = useNavigate();
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isPopupImageOpen, setIsPopupImageOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cards, setCards] = React.useState([]); 
    const [currentUser, setCurrentUser] = React.useState({}); 
    const [isLoading, setIsLoading] = React.useState(false);

    const [isLoggedIn, setIsLoggedIn] = React.useState(false); //стейт отвечающий за проверку статуса авторизации пользователя
    const [emailName, setEmailName] = React.useState(null); // стейт отвечающий за данные с почтой пользователя
    const [popupImage, setPopupImage] = React.useState(''); // стейт меняющий изображение у попапа с логином/регистрацией
    const [popupTitle, setPopupTitle] = React.useState(''); // стейт меняюший надпись у попапа с логином/регистрацией
    const [infoTooltip, setInfoTooltip] = React.useState(false); //стейт отвечающий за попап со статусом логина/регистрации

    //Функция регистрации пользователя
    function onRegister(email, password) { 
        auth.registerUser(email, password).then(() => {
            setPopupImage(resolve);
            setPopupTitle("Вы успешно зарегистрировались!");
            navigate("/sign-in");
        }).catch(() => {
            setPopupImage(reject);
            setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        }).finally(handleInfoTooltip);
    }

    //Функция логина пользователя  
    function onLogin(email, password) { 
        auth.loginUser(email, password).then((res) => {
            localStorage.setItem("jwt", res.token);
            setIsLoggedIn(true);
            setEmailName(email);
            navigate("/");
        }).catch(() => {
            setPopupImage(reject);
            setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
            handleInfoTooltip();
        });
    }

    //Эффект проверяюший токен
    React.useEffect(() => {
        const token = localStorage.getItem("jwt"); //было const jwt = localStorage.getItem("jwt");

        if (token) {
            auth.getToken(token).then((res) => { //было auth.getToken(jwt).then((res) =>
        if (res) {
            setIsLoggedIn(true);
            setEmailName(res.email); //было setEmailName(res.data.email)
            }
        }).catch((err) => {
            console.error(err);
        });
        }
    }, []);

    //Эффект проверяший залогинен ли пользователь
    React.useEffect(() => {
        if (isLoggedIn === true) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    //Эффект отвечающий за получение данных пользователя и карточек
    React.useEffect(() => {
        if (isLoggedIn === true) { //добавлена отправка карточек и пользователя только если авторизация прошла
            api.getUserInfo()
                .then(userInfo => setCurrentUser(userInfo))
                .catch(err => console.log(err))

            api.getCardList()
                .then(data => {
                    setCards(data.map((card) => ({
                        name: card.name,
                        link: card.link,
                        _id: card._id,
                        owner: card.owner,
                        likes: card.likes,
                    })
                ))
            })
                .catch(err => console.log(err));
        }    
    }, [isLoggedIn]);

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsPopupImageOpen(true);
    };

    //Функция открытия попапа с подтвержедние успешного/неуспешного логина/регистрации
    const handleInfoTooltip = () => {
        setInfoTooltip(true);
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsPopupImageOpen(false);
        setInfoTooltip(false);
    };

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isPopupImageOpen || infoTooltip;

    React.useEffect(() => {
        function closeAllPopupsByEsc(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if(isOpen) {
            document.addEventListener('keydown', closeAllPopupsByEsc);
            return () => {document.removeEventListener('keydown', closeAllPopupsByEsc);}
        }
    }, [isOpen]);

    const closeAllPopupsByOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            closeAllPopups()
        }
    };

    function handleUpdateUser(newUserInfo) {
        setIsLoading(true);
        api.setUserInfo(newUserInfo)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    };

    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.createItem(data)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    };


    function handleUpdateAvatar(photo) {
        setIsLoading(true);
        api.setUserAvatar(photo)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some((id) => id === currentUser._id);
        //console.log(isLiked);
            // api.putLike(card._id, !isLiked)
            //     .then((newCard) => {setCards((
            //         state) => state.map(
            //             (c) => c._id === card._id ? newCard : c));
            //     })
            //     .catch(err => console.log(err));
            
            // api.deleteLike(card._id, !isLiked)
            //     .then((newCard) => {setCards((
            //         state) => state.map(
            //             (c) => c._id === card._id ? newCard : c));
            //     })    
            //     .catch(err => console.log(err));
            api.changeLike(card._id, isLiked)
                .then((newCard) => {setCards((
                    state) => state.map(
                        (c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.log(err));
    };


    function handleCardDelete(card) {
        api.deleteItem(card._id)
            .then(() => setCards(
                state => state.filter(
                    item => item._id !== card._id)))
            .catch(err => console.log(err));
    };

    function onSignOut() {
        setIsLoggedIn(false);
        setEmailName(null);
        navigate("/sign-in");
        localStorage.removeItem("jwt");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Routes>
                        <Route path="/sign-in" element={
                            <>
                                <Header title="Регистрация" route="/sign-up"/>
                                <Login onLogin={onLogin} />
                            </>
                        }/>

                        <Route path="/sign-up" element={
                            <>
                                <Header title="Войти" route="/sign-in"/>
                                <Register onRegister={onRegister} />
                            </>
                        }/>

                        <Route exact path="/" element={
                            <>
                                <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
                                <ProtectedRoute
                                   component={Main}
                                   isLogged={isLoggedIn}
                                   cards={cards}
                                   onEditAvatar={handleEditAvatarClick}
                                   onEditProfile={handleEditProfileClick}
                                   onAddPlace={handleEditPlaceClick}
                                   onCardClick={handleCardClick}
                                   onCardLike={handleCardLike}
                                   onCardDelete={handleCardDelete}
                                />
                                <Footer />
                            </>
                        }/>
                         
                        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>} /> 
                    </Routes>

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser}
                        onClose={closeAllPopups}
                        onOverlayClose={closeAllPopupsByOverlay}
                        onLoading={isLoading}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onAddPlace={handleAddPlaceSubmit}
                        onClose={closeAllPopups}
                        onOverlayClose={closeAllPopupsByOverlay}
                        onLoading={isLoading}
                    />

                    <EditAvatarPopup 
                        isOpen={isEditAvatarPopupOpen}
                        onUpdateAvatar={handleUpdateAvatar}
                        onClose={closeAllPopups}
                        onOverlayClose={closeAllPopupsByOverlay}
                        onLoading={isLoading}
                    />

                    <ImagePopup
                        card={selectedCard}
                        isOpen={isPopupImageOpen}
                        onClose={closeAllPopups}
                        onOverlayClose={closeAllPopupsByOverlay}
                    />

                    <InfoTooltip 
                        image={popupImage} 
                        title={popupTitle} 
                        isOpen={infoTooltip} 
                        onClose={closeAllPopups} 
                        onOverlayClose={closeAllPopupsByOverlay}
                    />
                </div>
            </div>  
        </CurrentUserContext.Provider>
    );
}

export default App;
