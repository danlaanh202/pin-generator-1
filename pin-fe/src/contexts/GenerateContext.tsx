import React, { createContext, useState } from "react";
import { IContextProvider, IGenerateContextValue } from "../interface";
import { useLocation } from "react-router-dom";

export const GenerateContext = createContext<IGenerateContextValue>({});

export const GenerateContextProvider = ({ children }: IContextProvider) => {
  const value = {};
  return (
    <GenerateContext.Provider value={value}>
      {children}
    </GenerateContext.Provider>
  );
};

export default GenerateContextProvider;
