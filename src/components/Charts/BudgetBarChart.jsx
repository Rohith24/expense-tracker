import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";


 
export default function BudgetBarChart({budgets, height = 0, width = 0, showExpand = false}) {
  const Spent = budgets.map(budget => budget.tillNow);
  const amounts = budgets.map(budget => budget.amount-budget.tillNow);
  const names = budgets.map(budget => budget.name);
  
  const chartConfig = {
    type: "bar",
    series: [
      {
        name: "Spent",
        data: Spent,
      },
      {
        name: "Remaning",
        data: amounts,
      },
    ],
    options: {
      chart: {
        stacked: true,
        type: 'bar',
        toolbar: {
          show: false,
        },
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log("Name: " + names[config.dataPointIndex])
            if(config.seriesIndex === 0){
              console.log("Spent: " + Spent[config.dataPointIndex])
            }
            else{
              console.log("Remaning: " + amounts[config.dataPointIndex])
            }
          }
        }
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: names,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  if (height !== 0){
    chartConfig["height"] = height;
  }
  if (width !== 0){
    chartConfig["width"] = width;
  }


  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center justify-between"
      >
            <Typography variant="h4" color="blue-gray">
              Budgets usage
            </Typography>
            {
              showExpand && <Typography
                  as="a"
                  href="/transactions"
                  variant="small"
                  color="blue"
                  className="font-bold"
                  >
                  Expand
              </Typography>
            }
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}