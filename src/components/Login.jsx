import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
  } from "@material-tailwind/react";
import { Form } from "react-router-dom";
import { loginAction } from "../actions/login";

export async function LogInAction({request}){
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    console.log({data, request, formData});
    return await loginAction(formData);
}
   
  export function Login() {
    return (
      <Form method="post" className="mx-auto max-w-screen-sm px-4 py-2 lg:px-8 lg:py-4">
        <Card className="w-96 mt-10">
            <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
            >
            <Typography variant="h3" color="white">
                Sign In
            </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
            <Input label="Email" name="email" size="lg" />
            <input type="hidden" name="_actionType" value="login" />
            <Input label="Password" name="password" type="password" size="lg" />
            <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
            </div>
            </CardBody>
            <CardFooter className="pt-0">
            <button
                class="align-middle select-none font-sans font-bold text-center uppercase transition-all 
                disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 
                rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md 
                shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] 
                flex items-center gap-3 w-full justify-center"
                type="submit">
                <UserPlusIcon className="size-5 text-slate-500" />
                Sign In
            </button>
            <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                >
                Sign up
                </Typography>
            </Typography>
            </CardFooter>
        </Card>
      </Form>
    );
  }