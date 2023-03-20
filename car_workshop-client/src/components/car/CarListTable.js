import React from "react";
import CarListTableRow from './CarListTableRow'
import { useTranslation } from "react-i18next";

function CarListTable(props) {
    const cars = props.crList
    const { t } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('cr.fields.name')}</th>
                    <th>{t('cr.fields.mileage')}</th>
                    <th>{t('cr.fields.color')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {cars.map(cr =>
                    <CarListTableRow crData={cr} key={cr._id} />
                )}
            </tbody>
        </table>
    )
}

export default CarListTable