import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next'

class RepairDeleteInfo extends React.Component {
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
                <h2>{t('rep.form.details.pageTitle')}</h2>
                <label className='label-info'> {t('rep.form.delete.confirm.text')}</label>
                <div className="section-buttons">
                    <Link to="/repairs" className="button-return">{t('form.actions.return')}</Link>
                </div>
            </main >
        )
    }
}

export default withTranslation()(RepairDeleteInfo)