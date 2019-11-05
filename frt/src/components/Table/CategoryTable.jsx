import React from "react";
import withTable from "hocs/withTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import CellOption from "components/Table/CellOption";
import EmptyCell from "./EmptyCell";

const CategoryTable = ({tableData, cssRow, cssCell, hdRemove, hdEdit, options, ...props}) => (
    tableData.map((row, i) => (
        <TableRow className={cssRow} key={i}>
            <TableCell className={cssCell}>{i+1}</TableCell>
                <TableCell className={cssCell}>
                    {row.name ? row.name : <EmptyCell/>}
                </TableCell>
                <TableCell className={cssCell}>
                    {row.desc ? row.desc : <EmptyCell/>}
                </TableCell>
                {
                    options && <TableCell className={`${cssCell} options`}>
                        <CellOption options={options} use={row._id}/>
                    </TableCell>
                }
        </TableRow>
    ))
)

CategoryTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object)
}

export default withTable(CategoryTable);
