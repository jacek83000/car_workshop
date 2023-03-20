import React from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../helpers/authHelper";
import { getFormattedDate } from "../../helpers/dateHelper";
import { useTranslation } from "react-i18next";

function MechanicDetailsData(props) {
    const mc = props.mcData
    const { t } = useTranslation();

    let content
    if (mc.repairs.length === 0) {
        content = <p>{t('mc.form.details.rep.notAssigned')}</p>
    } else {
        content = <table className="table-list">
            <thead>
                <tr>
                    <th>{t('rep.fields.car')}</th>
                    <th>{t('rep.fields.startDate')}</th>
                    <th>{t('rep.fields.expectedEndDate')}</th>
                    <th>{t('rep.fields.price')}</th>
                    <th>{t('rep.fields.description')}</th>
                </tr>
            </thead>
            <tbody>
                {mc.repairs.map(
                    repair =>
                        <tr key={repair._id}>
                            <td>{repair.car.name}</td>
                            <td>{repair.startDate ? getFormattedDate(repair.startDate) : ""}</td>
                            <td>{repair.expectedEndDate ? getFormattedDate(repair.expectedEndDate) : ""}</td>
                            <td>{repair.price}</td>
                            <td>{repair.description}</td>
                        </tr>
                )}
            </tbody>
        </table>
    }

    return (
        <React.Fragment>
            <p>{t('mc.fields.firstName')}: {mc.firstName}</p>
            <p>{t('mc.fields.lastName')}: {mc.lastName}</p>
            <p>{t('mc.fields.email')}: {mc.email}</p>
            {isAuthenticated() &&
                <p><Link to={`/mechanics/edit/${mc._id}`} className="button-edit">{t('list.actions.edit')}</Link></p>
            }
            <h2>{t('mc.form.details.rep.title')}</h2>
            {content}
        </React.Fragment>
    )
}

export default MechanicDetailsData