import React from "react";
import AppLayoutContain from "contains/Layout/AppLayout";
import GridItem from "components/Grid/GridItem.jsx";
import ASBar from "contains/Bar/ASBar";
import EmptyBox from "components/Box/EmptyBox";
import TableCard from "components/Card/TableCard";
import SoldoutTable from "components/Table/SoldoutTable";

const ManageSoldout = ({table, foods, setFoods, hdUpdateQuantity, hdChange, ...props}) => (
    <AppLayoutContain {...props}>
        <GridItem xs={12} sm={12} md={12}>
            <TableCard
                title="Soldout List"
                subtitle="All food have quantity is 0"
            >
                <ASBar
                    keys={["name", "star", "quantity", "price", "discount", "category_id.name"]}
                    data={foods}
                    setData={setFoods}
                />
                {
                    foods.length > 0
                    ? <SoldoutTable
                        tableHeaderColor="primary"
                        tableHead={table.food.header}
                        tableData={foods}
                        hdChange={hdChange}
                        hdUpdateQuantity={hdUpdateQuantity}
                    />
                    : <EmptyBox
                        message="There is no soldout food to show here"
                    />
                }
            </TableCard>
        </GridItem>
    </AppLayoutContain>
);

export default ManageSoldout;