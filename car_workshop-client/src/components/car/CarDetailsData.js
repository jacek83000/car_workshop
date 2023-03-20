import React from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../helpers/authHelper";
import { getFormattedDate } from "../../helpers/dateHelper";
import { useTranslation } from "react-i18next";

function CarDetailsData(props) {
    const cr = props.crData
    const { t } = useTranslation();

    let content
    if (cr.repairs.length === 0) {
        content = <p>{t('cr.form.details.rep.notAssigned')}</p>
    } else {
        content = <table className="table-list">
            <thead>
                <tr>
                    <th>{t('rep.fields.mechanic')}</th>
                    <th>{t('rep.fields.startDate')}</th>
                    <th>{t('rep.fields.expectedEndDate')}</th>
                    <th>{t('rep.fields.price')}</th>
                    <th>{t('rep.fields.description')}</th>
                </tr>
            </thead>
            <tbody>
                {cr.repairs.map(
                    repair =>
                        <tr key={repair._id}>
                            <td>{repair.mechanic.lastName}</td>
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
            <p>{t('cr.fields.name')}: {cr.name}</p>
            <p>{t('cr.fields.mileage')}: {cr.mileage}</p>
            <p>{t('cr.fields.color')}: {cr.color}</p>
            {isAuthenticated() &&
                <p><Link to={`/cars/edit/${cr._id}`} className="button-edit">{t('list.actions.edit')}</Link></p>
            }
            <h2>{t('cr.form.details.rep.title')}</h2>
            {content}
        </React.Fragment>
    )
}

export default CarDetailsData