import { lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// components
import AppLayout from "@/components/layouts/AppLayout";
import Loader from "@/components/shared/Loader";
import RouteError from "@/components/shared/RouteError";
const AddTransaction = lazy(() => import("@/pages/add-transaction/AddTransaction"));
const TransactionList = lazy(() => import("@/pages/transaction-lists/TransactionList"));
const NotFound = lazy(() => import("@/components/shared/NotFound"));
const Home = lazy(() => import("@/pages/home/Home"));

export default function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<RouteError />} element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/transaction-init" element={<AddTransaction />} />
        <Route path="/transactions" element={<TransactionList />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return( 
    <RouterProvider 
      router={router} 
      fallbackElement={<Loader loading={true} />} 
    />
  );
}
