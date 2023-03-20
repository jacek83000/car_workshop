import React from "react";
import { Link } from 'react-router-dom';
import formMode from "../../helpers/formHelper";
import { useTranslation } from "react-i18next";

function FormButtons(props) {
    const { t } = useTranslation();
    const submitButtonLabel = props.formMode === formMode.NEW ? t('form.actions.add') : props.formMode === formMode.EDIT ? t('form.actions.edit') : t('login.btnLoginLabel')
    const error =

        props.error === 'invalidEmailAndPass' ? t('login.invalid') : (props.error === t('form.validation.message.summary') ? props.error : (props.error ? t('form.validation.message.emailInUse') : ''))



    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{error}</p>
            <input className="form-button-submit" type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('form.actions.cancel')}</Link>
        </div>
    )
}

export default FormButtons