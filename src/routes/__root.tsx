import { createRootRouteWithContext } from "@tanstack/react-router";
import { AuthContextType } from "../providers/auth_provider/interface";

type RouterContext = {
  authentication: AuthContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  wrapInSuspense: true,
});
