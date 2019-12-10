import React from "react";
import AppLayoutContain from "contains/Layout/AppLayout";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TableCard from "components/Card/TableCard";
import EmptyBox from "components/Box/EmptyBox";
import { Bar } from "react-chartjs-2";

const lineOptions = {
    scales: {
      xAxes: [
        {
          display: true
        }
      ]
    }
  };

const GeneralStatistic = ({foods, categories, bestAmountFood, bestAmountCate, bestPriceFood, bestPriceCate, ...props}) => (
    <AppLayoutContain {...props}>
      <GridItem xs={12} sm={12} md={12}>
          {
            foods.length > 0 && categories.length > 0
            ? <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TableCard
                    title="10 products sold amount the most"
                    subtitle=""
                  >
                    <Bar data={bestAmountFood} options={lineOptions}/>
                  </TableCard>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                  <TableCard
                    title="5 categories sold amount the most"
                    subtitle=""
                  >
                    <Bar data={bestAmountCate} options={lineOptions}/>
                  </TableCard>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                  <TableCard
                    title="10 products brought the most money"
                    subtitle=""
                  >
                    <Bar data={bestPriceFood} options={lineOptions}/>
                  </TableCard>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                  <TableCard
                    title="5 categories brought the most money"
                    subtitle=""
                  >
                    <Bar data={bestPriceCate} options={lineOptions}/>
                  </TableCard>
              </GridItem>
            </GridContainer>
            : <EmptyBox
              message="There is report here"
            />
          }
      </GridItem>
        
    </AppLayoutContain>
);

export default GeneralStatistic;


// const data = {
//     labels: [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December"
//     ],
//     datasets: [
//       {
//         label: "My First dataset",
//         backgroundColor: "rgba(75,192,92,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 1,
//         data: [65]
//       },
//       {
//         label: "My Second dataset",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255,99,132,1)",
//         borderWidth: 1,
//         data: [59]
//       },
//       {
//         label: "My Third dataset",
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//         data: [80]
//       },
//       {
//         label: "My Forth dataset",
//         backgroundColor: "rgba(255, 206, 86, 0.2)",
//         borderColor: "rgba(255, 206, 86, 1)",
//         borderWidth: 1,
//         data: [81]
//       },
//       {
//         label: "My Fifth dataset",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//         data: [56]
//       },
//       {
//         label: "My Sixth dataset",
//         backgroundColor: "rgba(153, 102, 255, 0.2)",
//         borderColor: "rgba(153, 102, 255, 1)",
//         borderWidth: 1,
//         data: [55]
//       },
//       {
//         label: "My Seventh dataset",
//         backgroundColor: "rgba(255, 159, 64, 0.2)",
//         borderColor: "rgba(255, 159, 64, 1)",
//         borderWidth: 1,
//         data: [46]
//       },
//       {
//         label: "My Eighth dataset",
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         borderColor: ["rgba(54, 162, 235, 1)"],
//         borderWidth: 1,
//         data: [90]
//       },
//       {
//         label: "My Nineth dataset",
//         backgroundColor: "rgba(179,181,198,0.2)",
//         borderColor: "rgba(179,181,198,1)",
//         borderWidth: 1,
//         data: [60]
//       },
//       {
//         label: "My Tenth dataset",
//         backgroundColor: "rgba(75,192,192,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 1,
//         data: [49]
//       }
//     ]
//   };