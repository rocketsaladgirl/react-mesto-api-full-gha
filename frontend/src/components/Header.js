import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo"></div> 
            <nav className="header__auth">
                <p className="header__text">{props.mail}</p>
                <Link to={props.route} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
            </nav>
        </header>
    );
}

export default Header;