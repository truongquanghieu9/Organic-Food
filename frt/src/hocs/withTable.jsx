import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import EmptyBox from "components/Box/EmptyBox";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

export default function withTable(WrappedComponent) {
    function CustomTable({classes, tableHead, tableHeaderColor, ...props}) {
        return (
            <div className={`${classes.tableResponsive} table-interact-separate`}>
                {
                    props.tableData.length > 0
                    ? <Table className={classes.table}>
                        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                            <TableRow className={classes.tableHeadRow}>
                                {tableHead.map((prop, key) => {
                                    return (
                                        <TableCell
                                            className={classes.tableCell + " " + classes.tableHeadCell}
                                            key={key}
                                        >
                                            {prop}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <WrappedComponent
                                cssRow={classes.tableRowBody}
                                cssCell={classes.tableCell}
                                {...props}
                            />
                        </TableBody>
                    </Table>
                    : <EmptyBox message="There is no data here."/>
                }
            </div>
        );
    }

    CustomTable.defaultProps = {
        tableHeaderColor: "gray"
    };

    CustomTable.propTypes = {
        classes: PropTypes.object.isRequired,
        tableHeaderColor: PropTypes.oneOf([
            "warning",
            "primary",
            "danger",
            "success",
            "info",
            "rose",
            "gray"
        ]),
        tableHead: PropTypes.arrayOf(PropTypes.string)
    };

    return withStyles(tableStyle)(CustomTable);
}
