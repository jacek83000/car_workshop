import React from "react";
import { useTranslation } from "react-i18next";
import { getValidationErrorKey } from "../../helpers/formHelper";

function FormSelect(props) {
    const error = props.error
    const errorKey = getValidationErrorKey(error)
    const { t } = useTranslation();
    const translatedErrorMessage = t(errorKey)

    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)

    return (
        <>
            <label htmlFor={props.name}>
                {props.label}
                {props.required &&
                    <span className="symbol-required">*</span>}
            </label>
            <select
                className={className}
                name={props.name}
                id={props.name}
                onChange={props.onChange}
                value={props.value}>
                {props.chooseOption}
                {props.content}
            </select>
            <span id={errorSpanId} className="errors-text">{translatedErrorMessage}</span>
        </>
    )
}

export default FormSelect