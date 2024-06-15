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
import { Accounts, accountsLoader } from './pages/Accounts';
import UpdateTransaction, { updateTransactionLoader } from './pages/UpdateTransaction';
import AccountForm from './banking/AccountForm';

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
        path: "/accounts",
        children:[
          {
            index: true,
            loader: accountsLoader,
            element: <Accounts />
          },
          {
            path: ":id",
            loader: accountDetailsLoader,
            element: <AccountDetails />
          },
          {
            path: ":id/edit",
            loader: accountDetailsLoader,
            element: <AccountForm />
          },
          {
            path: "create",
            element: <AccountCreate/>
          }
        ]
      },
      {
        path: "/transactions",
        children:[
          {
            index: true,
            loader: transactionLoader,
            element: <AllTransactionsTable />
          },
          {
            path: "create",
            element: <CreateTransaction/>,
            loader: createTransactionLoader,
            action: AddTransactionAction
          },
          {
            path: ":id",
            element: <UpdateTransaction/>,
            loader: updateTransactionLoader,
            action: AddTransactionAction
          }
        ]
      },
      {
        path: "logout",
        action: logoutAction
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
