import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [about, setDescription] = React.useState(''); 

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: about,
         });
    }

    //Для удобства отображения полей инпут добавляем отдельный функционал
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return(
        <PopupWithForm name={'edit'}
            title={'Редактировать профиль'}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            buttonText = {props.onLoading ?  'Сохраняю' : 'Сохранить'} //buttonText = {props.buttonText || 'Сохранить'}
            onClose={props.onClose}
            onOverlayClose={props.onOverlayClose}
        >
            <fieldset className="popup__field">
                <input className="popup__input popup__input_type_name" id="username-input" type="text" name="name" placeholder="Имя пользователя" value={name || ""} onChange={handleChangeName} minLength="2" maxLength="40" required/>
                <span className="username-input-error popup__input-error"></span>
                <input className="popup__input popup__input_type_description" id="userdescription-input" type="text" name="about" placeholder="Профессия пользователя" value={about || ""} onChange={handleChangeDescription} minLength="2" maxLength="200" required/>
                <span className="userdescription-input-error popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;