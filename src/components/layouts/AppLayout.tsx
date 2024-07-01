import { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";
import ComponentLoader from "../shared/ComponentLoader";
import Navbar from "../shared/Header/Navbar";
import PageWrapper from "../container/PageWrapper";

const AppLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Suspense fallback={<ComponentLoader />}>
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </Suspense>
    </Fragment>
  );
};

export default AppLayout;
