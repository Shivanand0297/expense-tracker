import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface IGLobalContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<IGLobalContext>({
  isLoading: false,
  setIsLoading: () => {}
})

const GlobalContextProvider = ({ children }: {children: ReactNode}) => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading }} >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;

export const useGlobalLoader = () => {
  const globalContext = useContext(GlobalContext);
  if(globalContext) {
    return globalContext;
  } else {
    throw new Error("GlobalContext can be used only inside global loader provider")
  }
}