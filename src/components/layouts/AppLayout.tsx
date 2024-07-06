import { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";
import ComponentLoader from "../shared/ComponentLoader";
import Navbar from "../shared/Header/Navbar";
import PageWrapper from "../container/PageWrapper";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../shared/ErrorFallback";

const AppLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Suspense fallback={<ComponentLoader />}>
        <PageWrapper>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, info) => {
              console.error({ error, info });
            }}
          >
            <Outlet />
          </ErrorBoundary>
        </PageWrapper>
      </Suspense>
    </Fragment>
  );
};

export default AppLayout;
