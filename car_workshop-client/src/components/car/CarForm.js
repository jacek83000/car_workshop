import React from "react";
import { Redirect } from "react-router-dom";
import { formValidationKeys } from "../../helpers/formHelper";
import formMode from "../../helpers/formHelper";
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import { checkRequired, checkTextLengthRange, checkNumber, checkNumberRange } from "../../helpers/validationCommon"
import { getCarByIdApiCall, addCarApiCall, updateCarApiCall } from "../../apiCalls/carApiCalls";
import { withTranslation } from 'react-i18next'

class CarForm extends React.Component {
    constructor(props) {
        super(props)

        const paramsCrId = props.match.params.crId
        const currentFormMode = paramsCrId ? formMode.EDIT : formMode.NEW

        this.state = {
            crId: paramsCrId,
            cr: {
                name: '',
                mileage: '',
                color: '',
            },
            errors: {
                name: '',
                mileage: '',
                color: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchCarDetails = () => {
        getCarByIdApiCall(this.state.crId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            cr: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchCarDetails()
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const cr = { ...this.state.cr }
        cr[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            cr: cr,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'name') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }

        if (fieldName === 'mileage') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber
            } else if (!checkNumberRange(fieldValue, 0, 10_000_000)) {
                errorMessage = formValidationKeys.ran_0_10mil
            }
        }

        if (fieldName === 'color') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                cr = this.state.cr,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addCarApiCall(cr)

            } else if (currentFormMode === formMode.EDIT) {
                const crId = this.state.crId
                promise = updateCarApiCall(crId, cr)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const cr = this.state.cr
        const errors = this.state.errors
        for (const fieldName in cr) {
            const fieldValue = cr[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }

        this.setState({
            errors: errors
        })

        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }


    render() {
        const { redirect } = this.state
        const { t } = this.props

        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('cr.form.add.confirm.text') : t('cr.form.edit.confirm.text')
            return (
                <Redirect to={{
                    pathname: "/cars",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('form.validation.message.summary') : ''
        const fetchError = this.state.error ? `${t('error: ')}: ${this.state.error.message}}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('cr.form.add.pageTitle') : t('cr.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('cr.fields.name') + ": "}
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder={t('form.placeholder.len_2_50')}
                        onChange={this.handleChange}
                        value={this.state.cr.name}
                    />
                    <FormInput
                        type="number"
                        label={t('cr.fields.mileage') + ": "}
                        required
                        error={this.state.errors.mileage}
                        name="mileage"
                        placeholder={t('form.placeholder.ran_0_10mil')}
                        onChange={this.handleChange}
                        value={this.state.cr.mileage}
                    />
                    <FormInput
                        type="text"
                        label={t('cr.fields.color') + ": "}
                        required
                        error={this.state.errors.color}
                        name="color"
                        placeholder={t('form.placeholder.len_2_50')}
                        onChange={this.handleChange}
                        value={this.state.cr.color}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/cars"
                    />
                </form>
            </main >
        )
    }
}

export default withTranslation()(CarForm)