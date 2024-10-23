import { createLazyFileRoute } from "@tanstack/react-router";
import { useLanguage, useTheme } from "../../providers";
// import { useQuery } from "@tanstack/react-query";
// import { useAxios } from "../../hooks";

const Dashboard = () => {
  const { t } = useLanguage();
  const { toggleTheme } = useTheme();
  //Example
  // const api = useAxios();
  // const { data } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => {
  //     const response = await api.get("https://dummyjson.com/products");
  //     return response.data;
  //   },
  // });

  return (
    <div>
      <h1 className="text-blue font-sans text-3xl">{t("dashboard")}</h1>
      <button onClick={toggleTheme}>Change theme</button>
    </div>
  );
};

export const Route = createLazyFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});
