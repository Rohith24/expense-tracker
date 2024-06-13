import logo from './logo.svg';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard, { DashboardAction, dashBoardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import Main, { MainLoader } from './pages/layouts/Main';
import AccountDetails, { accountDetailsLoader } from './banking/AccountDetails';
import AccountCreate from './banking/AccountCreate';
import { logoutAction } from './actions/logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { AllTransactionsTable, transactionLoader } from './pages/AllTransactionsTable';
import CreateTransaction, { AddTransactionAction, createTransactionLoader } from './pages/CreateTransaction';
import BudgetDetails, { budgetDetailsLoader } from './components/BudgetDetails';

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
        loader: accountDetailsLoader,
        element: <AccountDetails/>
      },
      {
        path: "/accounts/create",
        element: <AccountCreate/>
      },
      {
        path: "/transactions",
        loader: transactionLoader,
        element: <AllTransactionsTable />
      },
      {
        path: "logout",
        action: logoutAction
      },
      {
        path: "/transaction/create",
        element: <CreateTransaction/>,
        loader: createTransactionLoader,
        action: AddTransactionAction
      },
      {
        path: "/budgets/:id",
        loader: budgetDetailsLoader,
        element: <BudgetDetails />
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
