import { lazy } from "react";
//other-libs
import { RouteObject } from "react-router-dom";
//components
import { ProtectedRoute } from "./protected_route";
import { Layout } from "../components";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <ProtectedRoute />
      </Layout>
    ),
    children: [
      {
        path: "/dashboard",
        Component: lazy(() => import("../containers/dashboard")),
      },
    ],
  },
  {
    path: "/login",
    Component: lazy(() => import("../containers/auth/sign_in")),
  },
  {
    path: "*",
    element: <>Not found</>,
  },
];
