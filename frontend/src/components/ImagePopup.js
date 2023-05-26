function ImagePopup(props) {
    const card = props.card;

    return (
        <div className={`popup popup_type_zoom ${props.isOpen && 'popup_opened'}`} onClick={props.onOverlayClose}>
            <figure className="popup__img-container">
                <button className="popup__img-close-button popup__close-button" type="button" onClick={props.onClose}></button>
                <img className="popup__img-place" src={card.link} alt={card.name}/>
                <figcaption className="popup__img-title">
                    {card.name}
                </figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;