import { AxiosError, isAxiosError } from "axios";
import { useRouteError } from "react-router-dom";

const RouteError = () => {
  const routeError = useRouteError();
  console.error(routeError);

  const error = routeError as AxiosError | Error;

  return (
    <div className="bg-red-100 m-3 px-2 py-4 font-semibold text-red-700 rounded-md border border-red-700">
      <h1 className="text-lg">Ops something went wrong: {error?.message}</h1>
      {isAxiosError(error) ? <p>Api Route: {error?.config?.url}</p> : null}
      <pre>{error.stack}</pre>
    </div>
  );
};

export default RouteError;
