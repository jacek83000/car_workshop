import React from "react";
import { Redirect } from "react-router-dom";
import { formValidationKeys } from "../../helpers/formHelper";
import formMode from "../../helpers/formHelper";
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import { checkRequired, checkTextLengthRange, checkEmail } from "../../helpers/validationCommon"
import { getMechanicByIdApiCall, addMechanicApiCall, updateMechanicApiCall } from "../../apiCalls/mechanicApiCalls";
import { withTranslation } from 'react-i18next'

class MechanicForm extends React.Component {
    constructor(props) {
        super(props)

        const paramsMcId = props.match.params.mcId
        const currentFormMode = paramsMcId ? formMode.EDIT : formMode.NEW

        this.state = {
            mcId: paramsMcId,
            mc: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchMechanicDetails = () => {
        getMechanicByIdApiCall(this.state.mcId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            mc: data,
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
            this.fetchMechanicDetails()
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const mc = { ...this.state.mc }
        mc[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            mc: mc,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'firstName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }

        if (fieldName === 'lastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 50)) {
                errorMessage = formValidationKeys.len_2_50
            }
        }

        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 5, 50)) {
                errorMessage = formValidationKeys.len_5_50
            } else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail
            }
        }

        if (this.state.formMode === formMode.NEW && fieldName === 'password') {
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
                mc = this.state.mc,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addMechanicApiCall(mc)
            } else if (currentFormMode === formMode.EDIT) {
                const mcId = this.state.mcId
                promise = updateMechanicApiCall(mcId, mc)
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
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const mc = this.state.mc
        const errors = this.state.errors
        for (const fieldName in mc) {
            const fieldValue = mc[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('mc.form.add.confirm.text') : t('mc.form.edit.confirm.text');
            return (
                <Redirect to={{
                    pathname: "/mechanics",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('form.validation.message.summary') : ''
        const fetchError = this.state.error ? `${t('error: ')}: ${this.state.error.message}}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('mc.form.add.pageTitle') : t('mc.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message


        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('mc.fields.firstName') + ": "}
                        required
                        error={this.state.errors.firstName}
                        name="firstName"
                        placeholder={t('form.placeholder.len_2_50')}
                        onChange={this.handleChange}
                        value={this.state.mc.firstName}
                    />

                    <FormInput
                        type="text"
                        label={t('mc.fields.lastName') + ": "}
                        required
                        error={this.state.errors.lastName}
                        name="lastName"
                        placeholder={t('form.placeholder.len_2_50')}
                        onChange={this.handleChange}
                        value={this.state.mc.lastName}
                    />
                    <FormInput
                        type="text"
                        label={t('mc.fields.email') + ": "}
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder={t('form.placeholder.emailExample')}
                        onChange={this.handleChange}
                        value={this.state.mc.email}
                    />
                    {this.state.formMode === formMode.NEW ?
                        <FormInput
                            type="text"
                            label={t('mc.fields.password') + ": "}
                            required
                            error={this.state.errors.password}
                            name="password"
                            placeholder={t('form.placeholder.len_2_50')}
                            onChange={this.handleChange}
                            value={this.state.mc.password}
                        />
                        : null}
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/mechanics"
                    />
                </form>
            </main >
        )
    }
}

export default withTranslation()(MechanicForm)