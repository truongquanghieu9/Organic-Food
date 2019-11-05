import React from "react";
import withTable from "hocs/withTable";
import CellOption from "components/Table/CellOption";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const UserTable = ({tableData, cssCell, cssRow, options, ...props}) => (
    tableData.map((row, i) => (
        <TableRow className={cssRow} key={i}>
            <TableCell className={cssCell}>{i+1}</TableCell>
            <TableCell className={cssCell}>{row.email} </TableCell>
            {
                options && <TableCell className={`${cssCell} options`}>
                    <CellOption options={options} use={row._id}/>
                </TableCell>
            }
        </TableRow>
    ))
)

export default withTable(UserTable);
