import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard, { dashBoardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import Main, { MainLoader } from './pages/layouts/Main';
import { NavbarDefault } from './Nav/Navbar';

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
        errorElement: <Error />,
      },
      {
        path: "about",
        element: <h1>About</h1>
      }
    ]
  },
]);

function App() {
  const title = "Tracker";
  return (
    <div className="App">
      <NavbarDefault />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
