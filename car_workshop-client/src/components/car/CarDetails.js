import React from 'react'
import { getCarByIdApiCall } from '../../apiCalls/carApiCalls'
import { Link } from 'react-router-dom'
import CarDetailsData from './CarDetailsData'
import { withTranslation } from 'react-i18next'


class CarDetails extends React.Component {
    constructor(props) {
        super(props)
        let { crId } = props.match.params
        crId = parseInt(crId);

        this.state = {
            crId: crId,
            cr: null,
            error: null,
            isLoaded: false,
            message: null
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
        this.fetchCarDetails()
    }

    render() {
        const { cr, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.cr.loading')}...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <CarDetailsData crData={cr} />
        }

        return (
            <main>
                <h2>{t('cr.form.details.pageTitle')}</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/cars" className=" button-return">{t('form.actions.return')}</Link>
                </div>
            </main>
        )

    }
}

export default withTranslation()(CarDetails)