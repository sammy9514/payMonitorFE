// import { useState } from "react";
import { SidebarMenu } from "../components/SidebarMenu";
import { useDash } from "../hooks/sideDashContext";

export const Sidebar = () => {
  const sideItems = ["Overview", "Upcoming", "History"];
  // const { isOpen, setIsOpen } = useState(false);
  const { active, setActive } = useDash();
  return (
    <div className="hidden w-[450px] min-h-[calc(100vh-80px)] bg-[#222f3d] lg:flex justify-center items-center ">
      <div className="bg-red-50">p</div>
      <div className="w-[80%] h-[95%] ">
        {sideItems.map((item) => (
          <SidebarMenu
            key={item}
            name={item}
            isActive={active === item}
            onClick={() => setActive(item)}
          />
        ))}
      </div>
    </div>
  );
};
