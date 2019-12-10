import React from "react";
import withTable from "hocs/withTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import EmptyCell from "./EmptyCell";
import {inCurrency} from "services/utils";

const OrderTable = ({tableData, cssRow, cssCell, hdUpdateStatus, hdOrderDetail, ...props}) => (
    tableData.map((row, i) => (
        <TableRow className={cssRow} key={i}>
            <TableCell className={cssCell}>{i+1}</TableCell>
                <TableCell className={cssCell}>
                    {row.user_id.viewname ? row.user_id.viewname : <EmptyCell/>}
                </TableCell>
                <TableCell className={cssCell}>
                    {row.totalPrice ? inCurrency(row.totalPrice) : <EmptyCell/>}
                </TableCell>
                <TableCell className={cssCell}>
                    {row.status ? row.status : <EmptyCell/>}
                </TableCell>
                <TableCell className={cssCell}>
                    {row.pay_type ? row.pay_type : <EmptyCell/>}
                </TableCell>
                <TableCell className={`${cssCell} btnState`}>
                        <div className="button_bakg">
                            <span className="inspan" onClick={hdUpdateStatus.bind(this, row._id, "Paid")}>    
                                <button className="inbtn">Paid</button>
                            </span>
                        </div>

                        <div className="button_bakg">
                            <span className="inspan" onClick={hdUpdateStatus.bind(this, row._id, "Unpaid")}>    
                                <button className="inbtn">Unpaid</button>
                            </span>
                        </div>
                        <div className="button_bakg">
                            <span className="inspan" onClick={hdUpdateStatus.bind(this, row._id, "Shipping")}>    
                                <button className="inbtn">Shipping</button>
                            </span>
                        </div>
                        <div className="button_bakg">
                            <span className="inspan" onClick={hdUpdateStatus.bind(this, row._id, "Done")}>    
                                <button className="inbtn">Done</button>
                            </span>
                        </div>
                        
                </TableCell>
                <TableCell className={`${cssCell} payState`}>
                    <div className={row.status ? "unpaid" : ""}>
                        {<i className="fas fa-file-invoice-dollar"/>}
                        <span onClick={hdOrderDetail.bind(this, row._id)}>
                            Detail
                        </span>
                        {/* <a href={`/app/orders/${row._id}`}>
                            Detail
                        </a> */}
                    </div>
                </TableCell>
        </TableRow>
    ))
)

OrderTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object)
}

export default withTable(OrderTable);
