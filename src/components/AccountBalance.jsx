import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import { formatCurrency } from "../Service/helpers";
   
  function CheckIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    );
  }
   
  export function AccountBalance({title, amount,customColor}) {

    return (
      <Card style={{ backgroundColor: customColor }} variant="gradient" className="w-full max-w-[20rem]">
        <CardBody
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-1 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h2"
            color="white"
            className="font-normal"
          >
            {title}
          </Typography>
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-6xl font-normal"
          >
            <span className="mt-2 text-3xl">{formatCurrency(amount, "INR")}</span>
          </Typography>
          </CardBody>
      </Card>
    );
  }