import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Layout from "./components/Layout.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx"
import Login from './pages/Login.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Orders from './pages/Orders.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {

    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "collection",
        element: <Collection />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product/:productId",
        element: <Product />,

      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "place-order",
        element: <PlaceOrder />,
      },
      {
        path: "orders",
        element: <Orders />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
    <RouterProvider router={router} />
      <ToastContainer />
  </ShopContextProvider>
);