import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    React.useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: placeName,
            link: placeLink,
        });
    }

    //Для удобства отображения полей инпут добавляем отдельный функционал
    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }

    return (
        <PopupWithForm name={'add'}
            title={'Новое место'}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            buttonText = {props.onLoading ?  'Сохраняю' : 'Создать'} //buttonText = {props.buttonText || 'Создать'}
            onClose={props.onClose}
            onOverlayClose={props.onOverlayClose}
        >
            <fieldset className="popup__field">
                <input className="popup__input popup__input_type_title" id="phototitle-input" type="text" name="name" placeholder="Название" value={placeName} onChange={handleChangePlaceName} minLength="2" maxLength="30" required/>
                <span className="phototitle-input-error popup__input-error"></span>
                <input className="popup__input popup__input_type_link" id="photolink-input" type="url" name="link" placeholder="Ссылка на картинку" value={placeLink} onChange={handleChangePlaceLink} required/>
                <span className="photolink-input-error popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;