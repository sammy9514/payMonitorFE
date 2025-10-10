import { type FC } from "react";

interface iSide {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export const SidebarMenu: FC<iSide> = ({ name, isActive, onClick }: iSide) => {
  return (
    <div>
      <div
        className={`w-full h-[70px] ${
          isActive ? "bg-[#265598]" : "bg-transparent"
        } flex items-center px-5 mb-4 rounded-md text-white font-medium text-[18px] `}
        onClick={onClick}
      >
        {name}
      </div>
    </div>
  );
};
