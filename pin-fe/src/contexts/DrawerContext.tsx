import React, { createContext, useState } from "react";
import { IContextProvider, IDrawerContextValue } from "../interface";
import { useLocation } from "react-router-dom";

export const DrawerContext = createContext<IDrawerContextValue>({});

export const DrawerContextProvider = ({ children }: IContextProvider) => {
  const location = useLocation();
  const hasDrawer = ["/generate"].includes(location.pathname);
  const [showDrawer, setShowDrawer] = useState(false);
  const handleShowDrawer = () => {
    setShowDrawer(true);
  };
  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };
  const value = {
    hasDrawer,
    showDrawer,
    setShowDrawer,
    handleShowDrawer,
    handleCloseDrawer,
  };
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export default DrawerContextProvider;
