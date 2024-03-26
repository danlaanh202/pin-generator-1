import React from "react";
import { IHomePage } from "../../interface";
import TopBar from "./TopBar";
import DrawerContextProvider from "../../contexts/DrawerContext";

const AppLayout = ({ children }: IHomePage) => {
  const contentWrapperMarkup = (
    <div className="Pin-Wrapper__Content">{children}</div>
  );
  return (
    <DrawerContextProvider>
      <div className="Pin-Wrapper">
        <TopBar />
        {contentWrapperMarkup}
      </div>
    </DrawerContextProvider>
  );
};

export default AppLayout;
