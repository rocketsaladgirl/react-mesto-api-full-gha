import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef(null);

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }
    
    // //Для удобства отображения полей инпут добавляем отдельный функционал
    // function handleChangeAvatar() {
    //     return avatarRef.current.value;
    // }

    return (
        <PopupWithForm name={'change'}
            title={'Обновить аватар'}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            buttonText = {props.onLoading ?  'Сохраняю' : 'Сохранить'} //{props.buttonText || 'Сохранить'}
            onClose={props.onClose}
            onOverlayClose={props.onOverlayClose}
        >
            <fieldset className="popup__field">
                <input className="popup__input popup__input_type_avatar" id="avatar-input" type="url" name="avatar" placeholder="Ссылка на аватар" ref={avatarRef} required/>
                <span className="avatar-input-error popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;