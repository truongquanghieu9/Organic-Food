import React from "react";
import withTable from "hocs/withTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import EmptyCell from "./EmptyCell";
import {inCurrency} from "services/utils";

const OrderDetailTable = ({tableData, cssRow, cssCell, ...props}) => (
    tableData.map((row, i) => (
        <TableRow className={cssRow} key={i}>
            <TableCell className={cssCell}>{i+1}</TableCell>
                <TableCell className={cssCell}>
                    {row.food_id.category_id.name ? row.food_id.category_id.name : <EmptyCell/>}
                </TableCell>
                <TableCell className={cssCell}>
                    {row.food_id.name ? row.food_id.name : <EmptyCell/>}
                </TableCell>
                <TableCell className={cssCell}>
                    {row.quantity ? row.quantity : <EmptyCell/>}
                </TableCell>
                <TableCell className={cssCell}>
                    {row.price ? inCurrency(row.price) : <EmptyCell/>}       
                </TableCell>
                <TableCell className={cssCell}>
                    {row.quantity && row.price ? inCurrency(row.price*row.quantity) : <EmptyCell/>}
                </TableCell>

        </TableRow>
    ))
)

OrderDetailTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object)
}

export default withTable(OrderDetailTable);
