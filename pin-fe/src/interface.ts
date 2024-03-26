import { ReactNode } from "react";

export interface IComponentWithChildren {
  children: ReactNode;
}
export interface IHomePage extends IComponentWithChildren {}

export interface IContextProvider extends IComponentWithChildren {
  value?: Object;
}

export interface ICollapsible extends IComponentWithChildren {
  title: String;
}

export interface IDrawerContextValue {
  showDrawer: any;
  setShowDrawer: any;
  handleShowDrawer: any;
  handleCloseDrawer: any;
  hasDrawer: any;
}

export interface IGenerateContextValue {}
export interface ITemplateContextValue {}
