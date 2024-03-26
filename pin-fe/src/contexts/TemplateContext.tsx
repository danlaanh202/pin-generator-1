import { createContext } from "react";
import { IComponentWithChildren, ITemplateContextValue } from "../interface";

export const TemplateContext = createContext<ITemplateContextValue>({})

export const TemplateContextProvider = ({children, value}: IComponentWithChildren) => {
  return <TemplateContext.Provider value={value}>
    {children}
  </TemplateContext.Provider>
}