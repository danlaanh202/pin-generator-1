import React, { useContext } from "react";
import "./WithMarginTop.scss"
import { IComponentWithChildren } from "../../../interface";
import { DrawerContext } from "../../../contexts/DrawerContext";
import { DRAWER_WIDTH } from "../../../const";

export default function WithMarginTop({children}: IComponentWithChildren) {
  const {hasDrawer, showDrawer} = useContext(DrawerContext);

  return <div className="Pin-PrimaryContent" style={{marginLeft: hasDrawer && showDrawer ? `${DRAWER_WIDTH}px` : 0}}>
    {children}
  </div>
}