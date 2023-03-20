import React from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../helpers/authHelper";
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from "react-i18next";

function RepairDetailsData(props) {
    const rep = props.repData
    const repairStartDate = rep.startDate ? getFormattedDate(rep.startDate) : ""
    const repairExpectedEndDate = rep.expectedEndDate ? getFormattedDate(rep.expectedEndDate) : ""
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <p>{t('mc.fields.firstName')}: {rep.mechanic.firstName}</p>
            <p>{t('mc.fields.lastName')}: {rep.mechanic.lastName}</p>
            <p>{t('cr.fields.name')}: {rep.car.name}</p>
            <p>{t('rep.fields.startDate')}: {repairStartDate}</p>
            {repairExpectedEndDate && <p>{t('rep.fields.expectedEndDate')}: {repairExpectedEndDate}</p>}
            <p>{t('rep.fields.price')}: {rep.price}</p>
            <p>{t('rep.fields.description')}: {rep.description}</p>
            {isAuthenticated() &&
                <div className="section-buttons">
                    <Link to="/repairs" className="button-return">{t('form.actions.return')}</Link>
                    <Link to={`/repairs/edit/${rep._id}`} className="button-edit">{t('list.actions.edit')}</Link>
                </div>
            }
        </React.Fragment>
    )
}

export default RepairDetailsData