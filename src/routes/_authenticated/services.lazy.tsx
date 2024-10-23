import { createLazyFileRoute } from "@tanstack/react-router";
import { useLanguage } from "../../providers";

export const Route = createLazyFileRoute("/_authenticated/services")({
  component: () => {
    const { t } = useLanguage();

    return (
      <div>
        <h1>{t("services")}</h1>
      </div>
    );
  },
});
