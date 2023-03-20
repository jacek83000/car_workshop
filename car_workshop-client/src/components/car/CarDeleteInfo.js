import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next'

class CarDeleteInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false,
            message: null
        }
    }

    render() {
        const { t } = this.props

        return (
            <main>
                <h2>{t('cr.form.details.pageTitle')}</h2>
                <label className='label-info'> {t('cr.form.delete.confirm.text')}</label>
                <div className="section-buttons">
                    <Link to="/mechanics" className="button-return">{t('form.actions.return')}</Link>
                </div>
            </main >
        )
    }
}

export default withTranslation()(CarDeleteInfo)