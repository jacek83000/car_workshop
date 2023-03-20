import React from "react";
import { Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";

class Navigation extends React.Component {
    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('Something went wrong while loading ', err);
        });
    }

    render() {
        const { t } = this.props;
        const loginLogoutLink = isAuthenticated() ? <button onClick={this.props.handleLogout}>{t('login.btnLogoutLabel')}</button> : <Link to="/login">{t('login.btnLoginLabel')}</Link>

        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">{t('nav.main-page')}</Link></li>
                        <li><Link to="/mechanics">{t('nav.mechanics')}</Link></li>
                        <li><Link to="/cars">{t('nav.cars')}</Link></li>
                        <li><Link to="/repairs">{t('nav.repairs')}</Link></li>
                        <li><button onClick={() => { this.handleLanguageChange('pl') }}>PL</button></li>
                        <li><button onClick={() => { this.handleLanguageChange('en') }}>EN</button></li>
                        <li className="lang">{loginLogoutLink}</li>
                    </ul>
                </nav >
            </div>
        )
    }

}

export default withTranslation()(Navigation)