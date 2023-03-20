import React from "react";
import MechanicListTableRow from './MechanicListTableRow'
import { useTranslation } from "react-i18next";

function MechanicListTable(props) {
    const mechanics = props.mcList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th className="hidden_column">{t('mc.fields.firstName')}</th>
                    <th>{t('mc.fields.lastName')}</th>
                    <th>{t('mc.fields.email')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {mechanics.map(mc =>
                    <MechanicListTableRow mcData={mc} key={mc._id} />
                )}
            </tbody>
        </table>
    )
}

export default MechanicListTable