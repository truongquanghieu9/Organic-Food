import React from "react";
import AppLayoutContain from "contains/Layout/AppLayout";
import GridItem from "components/Grid/GridItem.jsx";
import ASBar from "contains/Bar/ASBar";
import EmptyBox from "components/Box/EmptyBox";
import TableCard from "components/Card/TableCard";
import OrderDetailTable from "components/Table/OrderDetailTable";

const ManageOrderDetail = ({order, setOrder, ...props}) => (
    <AppLayoutContain {...props}>
        <GridItem xs={12} sm={12} md={12}>
            <TableCard
                title="Order Detail"
                subtitle="Detail of order"
            >
                <ASBar
                    keys={["food_id.category_id.name", "food_id.name", "quantity", "price"]}
                    data={order}
                    setData={setOrder}
                />
                {
                    order.length > 0
                    ? <OrderDetailTable
                        tableHeaderColor="primary"
                        tableHead={["ID", "Category", "Food", "Quantity", "Price", "Into money"]}
                        tableData={order}
                    />
                    : <EmptyBox
                        message="There is no order information to show here"
                    />
                }
            </TableCard>
        </GridItem>
    </AppLayoutContain>
);

export default ManageOrderDetail;