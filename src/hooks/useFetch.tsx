import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useGlobalLoader } from "@/providers/globalLoaderProvider";
import api from "@/lib/axiosInstance";
import { wait } from "@/lib/utils";
import { AxiosError } from "axios";

type TApiResponse<TData> = {
  isPending: boolean;
  isError: boolean;
  data?: TData;
  error?: Error | AxiosError
};

export default function useFetch<TData>(url: string): TApiResponse<TData> {
  const { setIsLoading } = useGlobalLoader();
  const { showBoundary } = useErrorBoundary();


  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<TData>();
  const [error, setError] = useState<Error | AxiosError>();
  const [isError, setIsError] = useState(false);

  const getApiData = useCallback(async () => {

    setIsLoading(true);
    setIsPending(true);
    setIsError(false);
    // artificially delaying for api call for loader to visible clearly
    await wait();
    try {
      const apiResponse = await api.get(url);
      setData(apiResponse.data);
    } catch (error) {
      setIsError(true);
      
      if (error instanceof AxiosError || error instanceof Error) {
        toast.error(error.message);
        setError(error);
      }

      console.log("Error fetching transactions: ", error);
      showBoundary(error);
    } finally {
      setIsLoading(false);
      setIsPending(false);
    }
  }, [setIsLoading, showBoundary, url]);

  useEffect(() => {
    getApiData();
  }, [getApiData]);

  return { isPending, isError, data, error };
}
