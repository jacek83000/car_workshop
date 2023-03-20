import React from 'react';
import { Link } from 'react-router-dom';
import { getRepairsApiCall } from '../../apiCalls/repairApiCalls';
import RepairListTable from './RepairListTable'
import { withTranslation } from 'react-i18next'

class RepairList extends React.Component {
    constructor(props) {
        super(props)
        let notice = ''
        this.state = {
            error: null,
            isLoaded: false,
            repairs: [],
            notice: notice
        }
    }

    fetchRepairList = () => {
        getRepairsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        repairs: data
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
        this.fetchRepairList()
    }

    render() {
        const { error, isLoaded, repairs } = this.state
        let content;
        const { t } = this.props

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.rep.loading')}...</p>
        } else if (repairs.length === 0) {
            content = <p>{t('content.rep.noData')}</p>
        } else {
            content = <RepairListTable repairsList={repairs} />
        }

        return (
            <main>
                <p className="success-text">{this.state.notice}</p>
                <h2>{t('rep.list.pageTitle')}</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/repairs/add" className="button-add">{t('rep.list.addNew')}</Link>
                </p>
            </main>
        )
    }
}

export default withTranslation()(RepairList)