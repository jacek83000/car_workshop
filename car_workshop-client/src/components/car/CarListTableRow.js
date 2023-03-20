import React from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from "../../helpers/authHelper";
import { useTranslation } from "react-i18next";

function CarListTableRow(props) {
    const cr = props.crData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{cr.name}</td>
            <td>{cr.mileage}</td>
            <td>{cr.color}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/cars/details/${cr._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    {isAuthenticated() && <li><Link to={`/cars/edit/${cr._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>}
                    {isAuthenticated() && <li><Link to={`/cars/delete/${cr._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>}
                </ul>
            </td>
        </tr>
    )
}

export default CarListTableRow