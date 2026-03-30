import { createHashRouter, Navigate } from "react-router";
import { lazy } from "react";

import { AdminPage } from "@/admin/pages/AdminPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { HeroesLayout } from "@/components/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/components/heroes/pages/hero/HeroPage";
import { HomePage } from "@/components/heroes/pages/home/HomePage";
//import { SearchPage } from "@/components/heroes/pages/search/SearchPage";

const SearchPage = lazy(
  () => import("@/components/heroes/pages/search/SearchPage"),
);

export const appRouter = createHashRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "heroes/:idSlug",
        element: <HeroPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
