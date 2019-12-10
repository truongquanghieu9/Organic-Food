import React from "react";
import withTable from "hocs/withTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import CellOption from "components/Table/CellOption";
import EmptyCell from "components/Table/EmptyCell";

const ListImg = ({image}) =>
    image.map((u, i) => <img src={u.link} alt="" key={i}/>
)

const FoodTable = ({tableData, cssRow, cssCell, options, ...props}) => (
    tableData.map((row, i) => (
        <TableRow className={cssRow} key={i}>
            <TableCell className={cssCell}>{i+1}</TableCell>
            <TableCell className={cssCell}>{row.name} </TableCell>
            <TableCell className={cssCell}>{row.star} </TableCell>
            <TableCell className={cssCell}>{row.quantity} </TableCell>
            <TableCell className={cssCell}>{row.price} </TableCell>
            <TableCell className={cssCell}>{row.discount} </TableCell>
            <TableCell className={`${cssCell} custom-cell room-name`}>
                {
                    row.image_id.length > 0
                    ? <ListImg image={row.image_id.length > 5 ? row.image_id.slice(0, 5) : row.image_id} />
                    : <EmptyCell text="No image in this food"/>
                }
                {
                    row.image_id.length > 5 && (
                        <div>
                            <span>{`+${row.image_id.length - 5}`}</span>
                        </div>
                    )
                }
            </TableCell>

            <TableCell className={cssCell}>
                { row.category_id ? row.category_id.name : <EmptyCell/> }
            </TableCell>
            {
                options && <TableCell className={`${cssCell} options`}>
                    <CellOption options={options} use={row._id}/>
                </TableCell>
            }
        </TableRow>
    ))
)

FoodTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object)
}

export default withTable(FoodTable);
