import React from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../helpers/authHelper";
import { useTranslation } from "react-i18next";

function MechanicListTableRow(props) {
    const mc = props.mcData
    const { t } = useTranslation();
    return (
        <tr>
            <td className="hidden_column">{mc.firstName}</td>
            <td>{mc.lastName}</td>
            <td>{mc.email}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/mechanics/details/${mc._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAuthenticated() && <li><Link to={`/mechanics/edit/${mc._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>}
                    {isAuthenticated() && <li><Link to={`/mechanics/delete/${mc._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>}
                </ul>
            </td>
        </tr>
    )
}

export default MechanicListTableRow