import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
import { generateUniqueColors } from "../../Service/helpers";
   
  export default function BudgetPieChart({budgets}) {
    const amounts = budgets.map(budget => Math.abs(budget.amount));
    const names = budgets.map(budget => budget.name);
    const colors = generateUniqueColors(amounts.length);
    console.log(amounts)
    const chartConfig = {
      type: "pie",
      width: 380,
      height: 380,
      series: amounts,
      
      options: {
        labels: names,
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "Hello",
        },
        dataLabels: {
          enabled: true,
          // formatter: function (val, opts) {
          //   return opts.w.globals.labels[opts.seriesIndex] + ": " + val.toFixed(2) + "%";
          // }
        },
        colors: colors,
        legend: {
          show: false,
        },
      },
    };
    return (
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div>
            <Typography variant="h4" color="blue-gray">
              Budgets
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mt-4 grid place-items-center px-2">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    );
  }