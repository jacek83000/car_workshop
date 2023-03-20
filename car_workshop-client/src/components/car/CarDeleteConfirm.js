import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { getCarByIdApiCall, deleteCarApiCall } from '../../apiCalls/carApiCalls';
import { withTranslation } from 'react-i18next'

class CarDeleteConfirm extends React.Component {
    constructor(props) {
        super(props)
        let { crId } = props.match.params
        crId = parseInt(crId);

        this.state = {
            crId: crId,
            cr: null,
            error: null,
            errors: null,
            isLoaded: false,
            message: null,
            redirect: false
        }
    }

    fetchCarDetails = () => {
        getCarByIdApiCall(this.state.crId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            cr: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            cr: data,
                            message: null,
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

    componentDidMount() {
        this.fetchCarDetails()
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let
            promise,
            response;

        const crId = this.state.crId
        promise = deleteCarApiCall(crId);

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

    render() {
        const { redirect, cr, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props

        if (redirect) {
            return (
                <Redirect to={{
                    pathname: "/cars",
                    state: {
                        notice: t('cr.form.delete.confirm.text')
                    }
                }} />
            )
        }

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.cr.loading')}...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <label className='label-conf'> {t('cr.form.delete.confirm.question')
                + ' ' + cr.name + '?'}</label>
        }

        return (
            <main>
                <h2>{t('cr.list.title')}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    {content}
                    <div className="buttons-conf">
                        <input type="submit" className="button-yes" value={t('form.decisions.yes')} />
                        <Link to="/cars" className="button-no">{t('form.decisions.no')}</Link>
                    </div>
                </form>
            </main >
        )
    }
}

export default withTranslation()(CarDeleteConfirm)