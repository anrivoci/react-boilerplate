import { createFileRoute, redirect } from "@tanstack/react-router";
import { Layout } from "../components";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { isAuth } = context.authentication;
    if (!isAuth) {
      throw redirect({ to: "/login" });
    }
  },
  component: Layout,
});
