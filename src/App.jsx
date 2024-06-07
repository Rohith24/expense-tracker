import logo from './logo.svg';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard, { DashboardAction, dashBoardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import Main, { MainLoader } from './pages/layouts/Main';
import AccountDetails from './banking/AccountDetails';
import AccountCreate from './banking/AccountCreate';
import { logoutAction } from './actions/logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import AddTransaction, { AddTransactionAction } from './components/AddTransaction';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: MainLoader,
    errorElement: <Error />,
    children:[
      {
        index: true,
        element: <DashBoard />,
        loader: dashBoardLoader,
        action: DashboardAction,
        errorElement: <Error />
      },
      {
        path: "about",
        element: <h1>About</h1>
      },
      {
        path: "/accounts/:id",
        element: <AccountDetails/>
      },
      {
        path: "/accounts/create",
        element: <AccountCreate/>
      },
      {
        path: "logout",
        action: logoutAction
      },
      {
        path: "/transaction/create",
        element: <AddTransaction/>,
        action: AddTransactionAction
      }
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
