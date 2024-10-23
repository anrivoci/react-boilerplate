import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth, useLanguage } from "../../../providers";
import { PAGES } from "../../../helpers";

export const SideBar = memo(({ isOpen, toggle }: any) => {
  const { onLogOut } = useAuth();
  const { changeLanguage } = useLanguage();

  return (
    <aside className="sidebar">
      <button onClick={toggle} className="toggle-button">
        {isOpen ? "C" : "O"}
      </button>
      <div className="side_logo">
        <h1>🔥</h1>
        {isOpen && (
          <h2>
            React <br /> Boilerplate
          </h2>
        )}
      </div>
      <div className="side_menu">
        <ul>
          {PAGES.map((page) => {
            return (
              <li key={page.id}>
                <Link
                  to={page.path}
                  className={`menu_page ${!isOpen && "menu_page_closed"}`}
                  activeProps={{
                    className: "active_link",
                  }}
                >
                  <h2>{page.icon}</h2>
                  {isOpen && page.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="log_out">
        <div className="lang">
          <h1 onClick={() => changeLanguage("al")}>AL</h1>
          <h1 onClick={() => changeLanguage("en")}>EN</h1>
        </div>
        <div onClick={onLogOut}>LogOut</div>
      </div>
    </aside>
  );
});
