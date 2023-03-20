import React from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../helpers/authHelper";
import { useTranslation } from "react-i18next";

function RepairListTableRow(props) {
    const rep = props.repData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{rep.mechanic.firstName}</td>
            <td>{rep.mechanic.lastName}</td>
            <td>{rep.car.name}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`repairs/details/${rep._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAuthenticated() && <li><Link to={`repairs/edit/${rep._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>}
                    {isAuthenticated() && <li><Link to={`repairs/delete/${rep._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>}
                </ul>
            </td>
        </tr>
    )
}

export default RepairListTableRow