import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const { isAuth } = context.authentication;

    throw redirect({
      to: isAuth ? "/dashboard" : "/login",
    });
  },
});
