import { SidebarMenu } from "../components/SidebarMenu";
import { useDash } from "../hooks/sideDashContext";

export const Sidebar = () => {
  const sideItems = ["Overview", "Upcoming", "History"];
  const { active, setActive } = useDash();
  return (
    <div className="w-[350px] h-[calc(100vh-80px)] bg-[#222f3d] flex justify-center items-center ">
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
