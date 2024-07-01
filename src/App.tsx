import AppRoutes from "@/routes/AppRoutes";
import { Toaster } from "sonner";
import Loader from "@/components/shared/Loader";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main>
      <Toaster position="bottom-right" theme="light" expand={false} richColors={true} closeButton />
      <Loader loading={isLoading} />
      <AppRoutes />
    </main>
  );
}

export default App;
