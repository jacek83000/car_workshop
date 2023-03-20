import React from "react";
import RepairListTableRow from "../repair/RepairListTableRow";
import { useTranslation } from "react-i18next";

function RepairListTable(props) {
    const repairs = props.repairsList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('mc.fields.firstName')}</th>
                    <th>{t('mc.fields.lastName')}</th>
                    <th>{t('cr.fields.name')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {repairs.map(repair => <RepairListTableRow repData={repair} key={repair._id} />
                )}
            </tbody>
        </table>
    )
}

export default RepairListTable