import React from 'react'
import { Redirect } from "react-router-dom";
import { formValidationKeys } from "../../helpers/formHelper";
import formMode from "../../helpers/formHelper";
import FormInput from "../form/FormInput"
import FormButtons from "../form/FormButtons"
import FormSelect from '../form/FormSelect';
import { checkRequired, checkDate, checkNumber, checkNumberRange, checkDescLengthRange } from "../../helpers/validationCommon"
import { getRepairbyIdApiCall, addRepairApiCall, updateRepairApiCall } from "../../apiCalls/repairApiCalls";
import { getMechanicsApiCall } from '../../apiCalls/mechanicApiCalls';
import { getCarsApiCall } from '../../apiCalls/carApiCalls';
import { withTranslation } from 'react-i18next'
import { getFormattedDate } from '../../helpers/dateHelper';


class RepairForm extends React.Component {
    constructor(props) {
        super(props)


        const paramsRepId = props.match.params.repId
        const currentFormMode = paramsRepId ? formMode.EDIT : formMode.NEW

        this.state = {
            repId: paramsRepId,
            mechanics: [],
            cars: [],
            rep: {
                mc_id: '',
                cr_id: '',
                startDate: '',
                expectedEndDate: '',
                price: '',
                description: ''
            },
            errors: {
                mc_id: '',
                cr_id: '',
                startDate: '',
                expectedEndDate: '',
                price: '',
                description: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchRepairDetails = () => {
        getRepairbyIdApiCall(this.state.repId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            rep: data,
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

    fetchMechanicList = () => {
        getMechanicsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        mechanics: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    fetchCarList = () => {
        getCarsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        cars: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchRepairDetails()
        }
        this.fetchMechanicList()
        this.fetchCarList()
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const rep = { ...this.state.rep }
        rep[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            rep: rep,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';

        if (fieldName === 'mc_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }

        if (fieldName === 'cr_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            }
        }

        if (fieldName === 'startDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.dateFormat
            }
        }

        if (fieldName === 'expectedEndDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.dateFormat
            }
        }

        if (fieldName === 'price') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkNumber(fieldValue)) {
                errorMessage = formValidationKeys.isNumber
            } else if (!checkNumberRange(fieldValue, 0, 1_000_000)) {
                errorMessage = formValidationKeys.ran_0_1mil
            }
        }

        if (fieldName === 'description') {
            if (!checkDescLengthRange(fieldValue, 200)) {
                errorMessage = formValidationKeys.len_max_200
            }
        }

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                rep = this.state.rep,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addRepairApiCall(rep)

            } else if (currentFormMode === formMode.EDIT) {
                const repId = this.state.repId
                promise = updateRepairApiCall(repId, rep)
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
        const rep = this.state.rep
        const errors = this.state.errors
        for (const fieldName in rep) {
            const fieldValue = rep[fieldName]
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
        const { redirect, mechanics, cars } = this.state
        const { t } = this.props

        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('rep.form.add.confirm.text') : t('rep.form.edit.confirm.text')
            return (
                <Redirect to={{
                    pathname: "/repairs",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('form.validation.message.summary') : ''
        const fetchError = this.state.error ? `${t('error: ')}: ${this.state.error.message}}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('rep.form.add.pageTitle') : t('rep.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        const repairStartDate = this.state.rep.startDate ? getFormattedDate(this.state.rep.startDate) : ""
        const repairExpectedEndDate = this.state.rep.expectedEndDate ? getFormattedDate(this.state.rep.expectedEndDate) : ""
        const chosenMechanic = this.state.rep.mc_id ? this.state.rep.mc_id : '';
        const chosenCar = this.state.rep.cr_id ? this.state.rep.cr_id : '';
        const desc = this.state.rep.description ? this.state.rep.description : ''

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormSelect
                        label={t('rep.fields.mechanic') + ": "}
                        required
                        error={this.state.errors.mc_id}
                        name="mc_id"
                        onChange={this.handleChange}
                        value={chosenMechanic}
                        chooseOption={<option value="">--- {t('rep.form.select.mc')} ---</option>}
                        content={mechanics.map(mc => (<option key={mc._id} value={mc._id} label={mc.firstName + ' ' + mc.lastName}></option>))}
                    />
                    <FormSelect
                        label={t('rep.fields.car') + ": "}
                        required
                        error={this.state.errors.cr_id}
                        name="cr_id"
                        onChange={this.handleChange}
                        chooseOption={<option value="">--- {t('rep.form.select.cr')} ---</option>}
                        value={chosenCar}
                        content={cars.map(cr => (<option key={cr._id} value={cr._id} label={cr.name}></option>))}
                    />
                    <FormInput
                        type="date"
                        label={t('rep.fields.startDate') + ": "}
                        required
                        error={this.state.errors.startDate}
                        name="startDate"
                        placeholder={t('form.placeholder.dateFormat')}
                        onChange={this.handleChange}
                        value={repairStartDate}
                    />
                    <FormInput
                        type="date"
                        label={t('rep.fields.expectedEndDate') + ": "}
                        required
                        error={this.state.errors.expectedEndDate}
                        name="expectedEndDate"
                        placeholder={t('form.placeholder.dateFormat')}
                        onChange={this.handleChange}
                        value={repairExpectedEndDate}
                    />
                    <FormInput
                        type="number"
                        label={t('rep.fields.price') + ": "}
                        required
                        error={this.state.errors.price}
                        name="price"
                        placeholder={t('form.placeholder.ran_0_1mil')}
                        onChange={this.handleChange}
                        value={this.state.rep.price}
                    />
                    <FormInput
                        type="text"
                        label={t('rep.fields.description') + ": "}
                        required
                        error={this.state.errors.description}
                        name="description"
                        placeholder={t('form.placeholder.descriptionExample')}
                        onChange={this.handleChange}
                        value={desc}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/repairs"
                    />
                </form>
            </main>
        )
    }
}

export default withTranslation()(RepairForm)