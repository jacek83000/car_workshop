import React from 'react';
import { getRepairbyIdApiCall } from '../../apiCalls/repairApiCalls';
import RepairDetailsData from './RepairDetailsData'
import { withTranslation } from 'react-i18next'

class RepairDetails extends React.Component {
    constructor(props) {
        super(props)

        let { repId } = props.match.params
        repId = parseInt(repId);

        this.state = {
            repId: repId,
            rep: null,
            error: null,
            isLoaded: false,
            message: null
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

    render() {
        const { rep, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props

        if (error) {
            content = <p>{t('content.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('content.rep.loading')}...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <RepairDetailsData repData={rep} />
        }

        return (
            <main>
                <h2>{t('rep.form.details.pageTitle')}</h2>
                {content}
            </main >
        )
    }
}

export default withTranslation()(RepairDetails)