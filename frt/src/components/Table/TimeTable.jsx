import React from "react";
import withTable from "hocs/withTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import moment from "moment";
import EmptyCell from "./EmptyCell";

const TimeTable = ({tableData, cssRow, cssCell, hdRemove, hdEdit, options, hdChangePay, ...props}) => (
    tableData.map((row, i) => (
        <TableRow className={cssRow} key={i}>
            <TableCell className={cssCell}>{i+1}</TableCell>
                <TableCell className={cssCell}>
                    {
                        row.pay.time
                        ? moment(row.pay.time).format("ddd Do, MMM YYYY")
                        : <EmptyCell/>
                    }
                </TableCell>
        </TableRow>
    ))
)

TimeTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object)
}

export default withTable(TimeTable);
