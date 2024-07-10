import { Suspense } from "react";
//other-libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Fallback } from "../components";
//routes
import { routes } from "../routes/config";

const App = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider
        router={createBrowserRouter(routes)}
        fallbackElement={<>Loading</>}
      />
    </Suspense>
  );
};

export default App;
