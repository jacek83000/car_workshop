import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { getMechanicByIdApiCall, deleteMechanicApiCall } from '../../apiCalls/mechanicApiCalls';
import { withTranslation } from 'react-i18next'

class MechanicDeleteConfirm extends React.Component {
    constructor(props) {
        super(props)
        let { mcId } = props.match.params
        mcId = parseInt(mcId);

        this.state = {
            mcId: mcId,
            mc: null,
            error: null,
            errors: null,
            isLoaded: false,
            message: null,
            redirect: false
        }
    }

    fetchMechanicDetails = () => {
        getMechanicByIdApiCall(this.state.mcId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            mc: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            mc: data,
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
        this.fetchMechanicDetails()
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let
            promise,
            response;

        const mcId = this.state.mcId
        promise = deleteMechanicApiCall(mcId);

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
        const { redirect, mc, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props

        if (redirect) {
            return (
                <Redirect to={{
                    pathname: "/mechanics",
                    state: {
                        notice: t('mc.form.delete.confirm.text')
                    }
                }} />
            )
        }

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.mc.loading')}...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <label className='label-conf'> {t('mc.form.delete.confirm.question')
                + ' ' + mc.firstName + ' ' + mc.lastName + '?'}</label>
        }

        return (
            <main>
                <h2>{t('mc.list.title')}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    {content}
                    <div className="buttons-conf">
                        <input type="submit" className="button-yes" value={t('form.decisions.yes')} />
                        <Link to="/mechanics" className="button-no">{t('form.decisions.no')}</Link>
                    </div>
                </form>
            </main >
        )
    }
}

export default withTranslation()(MechanicDeleteConfirm)