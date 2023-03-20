import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { deleteRepairApiCall, getRepairbyIdApiCall } from '../../apiCalls/repairApiCalls';
import { withTranslation } from 'react-i18next'

class RepairDeleteConfirm extends React.Component {
    constructor(props) {
        super(props)
        let { repId } = props.match.params
        repId = parseInt(repId);

        this.state = {
            repId: repId,
            rep: null,
            error: null,
            errors: null,
            isLoaded: false,
            message: null,
            redirect: false
        }
    }

    fetchRepairDetails = () => {
        getRepairbyIdApiCall(this.state.repId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            rep: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            rep: data,
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
        this.fetchRepairDetails()
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let
            promise,
            response;

        const repId = this.state.repId
        promise = deleteRepairApiCall(repId);

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
        const { redirect, rep, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props

        if (redirect) {
            return (
                <Redirect to={{
                    pathname: "/repairs",
                    state: {
                        notice: t('rep.form.delete.text')
                    }
                }} />
            )
        }

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.rep.loading')}...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <label className='label-conf'> {t('rep.form.delete.confirm.question')
                + ' ' + rep.mechanic.firstName + ' ' + rep.mechanic.lastName + ' - ' + rep.car.name + '?'}</label>
        }

        return (
            <main>
                <h2>{t('rep.list.title')}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    {content}
                    <div className="buttons-conf">
                        <input type="submit" className="button-yes" value={t('form.decisions.yes')} />
                        <Link to="/repairs" className="button-no">{t('form.decisions.no')}</Link>
                    </div>
                </form>
            </main >
        )
    }
}

export default withTranslation()(RepairDeleteConfirm)