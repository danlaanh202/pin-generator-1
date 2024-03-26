import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import defaultRoutes from "./defaultRoutes";
import AppLayout from "../layouts/AppLayout/AppLayout";
import NotFound from "../pages/NotFound";

const Routing = ({ prefix = "" }) => {
  const routeGroups = [
    ...defaultRoutes,
    {
      path: "*",
      component: NotFound,
    },
  ];

  return (
    <Router>
      <AppLayout>
        <Routes>
          {routeGroups.map((group, index) => (
            <Route
              key={index}
              path={`${prefix}${group.path}`}
              Component={group.component as any}
            ></Route>
          ))}
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default Routing;
