import React from 'react'
import { Link } from 'react-router-dom'
import { getMechanicsApiCall } from '../../apiCalls/mechanicApiCalls'
import MechanicListTable from './MechanicListTable'
import { withTranslation } from 'react-i18next'
import { isAuthenticated } from "../../helpers/authHelper";

class MechanicList extends React.Component {

    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            mechanics: [],
            notice: notice
        }
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

    componentDidMount() {
        this.fetchMechanicList()
    }

    render() {
        const { error, isLoaded, mechanics } = this.state
        let content;
        const { t } = this.props

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.mc.loading')}...</p>
        } else if (mechanics.length === 0) {
            content = <p>{t('content.mc.noData')}</p>
        } else {
            content = <MechanicListTable mcList={mechanics} />
        }

        return (
            <main>
                <p className="success-text">{this.state.notice}</p>
                <h2>{t('mc.list.pageTitle')}</h2>
                {content}
                {isAuthenticated() &&
                    <p className="sections-buttons">
                        <Link to="/mechanics/add" className="button-add">{t('mc.list.addNew')}</Link>
                    </p>
                }
            </main>
        )
    }
}

export default withTranslation()(MechanicList) 