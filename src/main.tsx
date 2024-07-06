import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import GlobalContextProvider from "@/providers/globalLoaderProvider.tsx";
import ErrorFallback from "@/components/shared/ErrorFallback.tsx";

import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/themeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <GlobalContextProvider>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error, info) => {
            console.error({ error, info });
          }}
        >
          <App />
        </ErrorBoundary>
      </GlobalContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
