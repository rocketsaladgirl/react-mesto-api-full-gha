import {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id; //определяем владельца карточки
    const isLiked = card.likes.some(i => i._id === currentUser._id); //определяем, есть ли у карточки лайк, поставленный пользователем
    const cardLikeButtonClassName = (`element__like-button ${isLiked && 'element__like-button_active'}`);//cоздаём переменную `className` для кнопки лайка

    const handleCardClick = () => {
        onCardClick(card);
    };

    const handleCardLikeClick = () => {
        onCardLike(card);
    };

    const handleCardDeleteClick = () => {
        onCardDelete(card);
    };

    return (
        <article className="element">
            <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleCardLikeClick}/>
                    <p className="element__like-container">
                        {card.likes.length}
                    </p>
                </div>
            </div>
            {isOwn && <button className="element__trash-button" type="button" onClick={handleCardDeleteClick}/>}
        </article>
    );
}

export default Card;