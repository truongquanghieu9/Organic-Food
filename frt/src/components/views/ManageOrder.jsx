import React from "react";
import AppLayoutContain from "contains/Layout/AppLayout";
import GridItem from "components/Grid/GridItem.jsx";
import ASBar from "contains/Bar/ASBar";
import EmptyBox from "components/Box/EmptyBox";
import TableCard from "components/Card/TableCard";
import OrderTable from "components/Table/OrderTable";

const ManageOrder = ({orders, setOrders, hdUpdateStatus, hdOrderDetail, ...props}) => (
    <AppLayoutContain {...props}>
        <GridItem xs={12} sm={12} md={12}>
            <TableCard
                title="Order List"
                subtitle="All order of shop"
            >
                <ASBar
                    keys={["user_id.viewname", "totalPrice", "status", "pay_type"]}
                    data={orders}
                    setData={setOrders}
                />
                {
                    orders.length > 0
                    ? <OrderTable
                        tableHeaderColor="primary"
                        tableHead={["ID", "Viewname", "Total price", "Status", "Pay type", "Payment Status", "Order Detail"]}
                        tableData={orders}
                        hdUpdateStatus={hdUpdateStatus}
                        hdOrderDetail={hdOrderDetail}
                    />
                    : <EmptyBox
                        message="There is no order information to show here"
                    />
                }
            </TableCard>
        </GridItem>
    </AppLayoutContain>
);

export default ManageOrder;