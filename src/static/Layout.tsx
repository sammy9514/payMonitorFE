import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <div className="flex  ">
        <Sidebar />
        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
