import React from "react";
import withTable from "hocs/withTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import EmptyCell from "components/Table/EmptyCell";
import GridItem from "components/Grid/GridItem.jsx";
import FormInput from "components/CustomInput/FormInput";

const ListImg = ({image}) =>
    image.map((u, i) => <img src={u.link} alt="" key={i}/>
)

const SoldoutTable = ({tableData, cssRow, cssCell, hdChange, hdUpdateQuantity, ...props}) => (
    tableData.map((row, i) => (
        <TableRow className={cssRow} key={i}>
            <TableCell className={cssCell}>{i+1}</TableCell>
                <TableCell className={cssCell}>
                    { row.category_id ? row.category_id.name : <EmptyCell/> }
                </TableCell>
                <TableCell className={cssCell}>{row.name} </TableCell>
                <TableCell className={cssCell}>{row.star} </TableCell>
                <TableCell className={cssCell}>
                    <GridItem xs={5} sm={5} md={5}>
                        <FormInput
                            type="number"
                            label=""
                            placeholder="Quantity"
                            name="quantity"
                            value={row.quantity}
                            onChange={hdChange.bind(this, row._id)}
                            required
                        />
                    </GridItem>
                </TableCell>
                <TableCell className={cssCell}>{row.price} </TableCell>
                <TableCell className={cssCell}>{row.discount} </TableCell>
                <TableCell className={`${cssCell} food-image`}>
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
                <TableCell className={`${cssCell} btnState`}>
                        <div className="button_bakg">
                            <span className="inspan" onClick={hdUpdateQuantity.bind(this, row._id, row.quantity)}>    
                                <button className="inbtn">Update quantity</button>
                            </span>
                        </div>                    
                </TableCell>
        </TableRow>
    ))
)

SoldoutTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object)
}

export default withTable(SoldoutTable);
