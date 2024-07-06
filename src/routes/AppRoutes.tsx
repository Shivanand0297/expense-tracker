import { lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// components
import AppLayout from "@/components/layouts/AppLayout";
const AddTransaction = lazy(() => import("@/pages/add-transaction/AddTransaction"));
const TransactionList = lazy(() => import("@/pages/transaction-lists/TransactionList"));
const NotFound = lazy(() => import("@/components/shared/NotFound"));
const Home = lazy(() => import("@/pages/home/Home"));

export default function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/transaction-init" element={<AddTransaction />} />
        <Route path="/transactions" element={<TransactionList />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
