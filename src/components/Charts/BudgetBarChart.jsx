import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { NavLink } from "react-router-dom";
import { roundNumber } from "../../Service/helpers";


 
export default function BudgetBarChart({budgets, height = 0, width = 0, showExpand = false}) {
  const Spent = budgets.map(budget => {
    if(budget.tillNow > budget.amount){
      return Math.abs(budget.amount);
    }
    return roundNumber(budget.tillNow);
  });
  let hasOverflow = false;
  const OverFlow = budgets.map(budget => {
    let over = roundNumber(budget.amount-budget.tillNow);
    if(over < 0){
      hasOverflow = true;
      return Math.abs(over);
    }
    return 0;
  });
  const amounts = budgets.map(budget => {
    let over = roundNumber(budget.amount-budget.tillNow);
    if(over >= 0){
      return Math.abs(over);
    }
    return 0;
  });

  const series = [];
  series.push({name: "Spent", data: Spent });
  series.push({name: "Remaining", data: amounts});
  if (hasOverflow)
  series.push({name: "Overflow", data: OverFlow});
  const names = budgets.map(budget => budget.name);
  
  const chartConfig = {
    type: "bar",
    series: series,
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
          show: true,
        },
        axisBorder: {
          show: true,
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
                  variant="small"
                  color="blue"
                  className="font-bold"
                  >
                    <NavLink to="/transactions">Expand</NavLink>
              </Typography>
            }
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}