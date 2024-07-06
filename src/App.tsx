import { Toaster } from "sonner";

import AppRoutes from "@/routes/AppRoutes";
import Loader from "@/components/shared/Loader";
import { useGlobalLoader } from "./providers/globalLoaderProvider";

function App() {
  const { isLoading } = useGlobalLoader();

  return (
    <main className="min-h-screen dark:bg-background dark:text-foreground" >
      <Toaster position="top-right" theme="light" expand={false} richColors={true} closeButton />
      <Loader loading={isLoading} />
      <AppRoutes />
    </main>
  );
}

export default App;
