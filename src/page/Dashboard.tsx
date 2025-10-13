import { useDash } from "../hooks/sideDashContext";
import { Overview } from "./Overview";
import { Upcoming } from "./Upcoming";
import { History } from "./History";
import { AddShifts } from "./AddShifts";

export const Dashboard = () => {
  const { active } = useDash();

  const renderDash = () => {
    switch (active) {
      case "Overview":
        return <Overview />;
      case "Upcoming":
        return <Upcoming />;
      case "History":
        return <History />;
      case "Add shifts":
        return <AddShifts />;
      // default:
      //   return <Overview />;
    }
  };
  return (
    <div className="w-[calc(100%-350px)] flex justify-center">
      {renderDash()}
    </div>
  );
};
