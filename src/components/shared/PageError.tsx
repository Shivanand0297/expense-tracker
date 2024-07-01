import { AxiosError } from "axios"
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  error: Error | AxiosError
}

const PageError = ({ error }: Props) => {

const [errorMessage, setErrorMessage] = useState<string | null>(null)
  useEffect(() => {
    if(error instanceof AxiosError){
      setErrorMessage(error.response?.data.message);
    } else {
      setErrorMessage(error.message)
    }
    toast.error(errorMessage);
  }, [error, errorMessage])

  return (
    <div className="bg-red-100 px-2 py-4 font-semibold text-red-700 rounded-md border border-red-700 text-center">
      <p>Error: {errorMessage}</p>
    </div>
  )
}

export default PageError