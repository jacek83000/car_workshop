import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from "../../helpers/authHelper";
import { getCarsApiCall } from '../../apiCalls/carApiCalls'
import CarListTable from './CarListTable'
import { withTranslation } from 'react-i18next'

class CarList extends React.Component {

    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            cars: [],
            notice: notice
        }
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

    componentDidMount() {
        this.fetchCarList()
    }

    render() {
        const { error, isLoaded, cars } = this.state
        let content;
        const { t } = this.props

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.cr.loading')}...</p>
        } else if (cars.length === 0) {
            content = <p>{t('content.cr.noData')}</p>
        } else {
            content = <CarListTable crList={cars} />
        }

        return (
            <main>
                <p className="success-text">{this.state.notice}</p>
                <h2>{t('cr.list.pageTitle')}</h2>
                {content}
                {isAuthenticated() &&
                    <p className="sections-buttons">
                        <Link to="/cars/add" className="button-add">{t('cr.list.addNew')}</Link>
                    </p>
                }
            </main>
        )
    }
}

export default withTranslation()(CarList) 