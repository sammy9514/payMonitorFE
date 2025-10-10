import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <div className="flex  ">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
