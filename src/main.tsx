import ReactDOM from "react-dom/client";
//@tanstack-query&router
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
//global_providers
import { LanguageProvider, AuthProvider, ThemeProvider } from "./providers";
//auth_hook
import { useAuth } from "./providers";
//generated routes
import { routeTree } from "./routeTree.gen";
//global styles
import "./assets/global.css";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);
