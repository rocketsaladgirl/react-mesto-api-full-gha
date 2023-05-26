import {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({cards, onAddPlace, onEditProfile, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__container">
                        <img className="profile__image" src={currentUser.avatar} alt="Фото профиля"/> 
                        <div className="profile__overlay" onClick={() => {onEditAvatar(true)}}></div>
                    </div>
                    <div className="profile__field">
                        <div className="profile__block">
                            <h1 className="profile__username">{currentUser.name}</h1>
                            <button className="profile__edit-button" onClick={() => {onEditProfile(true)}} type="button"></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={() => {onAddPlace(true)}} type="button"></button>
            </section>
            <section className="elements">
                {cards.map((card) =>
                    <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                )}
            </section>
        </main>
    );
}

export default Main;