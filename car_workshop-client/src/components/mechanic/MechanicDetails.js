import React from 'react'
import { Link } from 'react-router-dom'
import { getMechanicByIdApiCall } from '../../apiCalls/mechanicApiCalls'
import MechanicDetailsData from './MechanicDetailsData'
import { withTranslation } from 'react-i18next'

class MechanicDetails extends React.Component {
    constructor(props) {
        super(props)
        let { mcId } = props.match.params
        mcId = parseInt(mcId);

        this.state = {
            mcId: mcId,
            mc: null,
            error: null,
            isLoaded: false,
            message: null
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

    componentDidMount() {
        this.fetchMechanicDetails()
    }

    render() {
        const { mc, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.mc.loading')}...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <MechanicDetailsData mcData={mc} />
        }

        return (
            <main>
                <h2>{t('mc.form.details.pageTitle')}</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/mechanics" className="button-return">{t('form.actions.return')}</Link>
                </div>
            </main>
        )

    }
}

export default withTranslation()(MechanicDetails)