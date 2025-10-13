import { useNavigate } from "react-router-dom";
import { ChartComp } from "../components/Chart";
import data from "../data.json";
import { useDash } from "../hooks/sideDashContext";

export const Overview = () => {
  const { setActive } = useDash();
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center ">
      <div className="w-[90%] mt-6  ">
        <div className="flex justify-between items-center ">
          <h1 className="text-[40px] font-semibold ">This Week</h1>
          <button
            className="text-[20px] cursor-pointer"
            onClick={() => navigate("/addshift")}
          >
            +Add shifts
          </button>
        </div>
        <div className="grid grid-cols-3 gap-7 mt-[50px] ">
          <div className="w-full h-[250px] rounded-md bg-gray-200 col-span-3 px-8 py-6 flex justify-between ">
            <h2 className="text-[30px] font-semibold mt-[8px] ">Date-Time</h2>
            <div className="flex gap-5 items-center">
              <div className="w-[280px] h-[160px] bg-[#265598] rounded-[12px] py-9 px-6 text-white  ">
                <h3 className="font-medium text-[25px] ">Total Earned</h3>
                <h2 className="font-bold text-[30px] ">£5000.00</h2>
              </div>
              <div className="w-[280px] h-[160px] shadow-md rounded-[12px] py-9 px-6 bg-[whitesmoke] ">
                <h3 className="font-medium text-[25px] ">Next Payday</h3>
                <h2 className="font-bold text-[30px] ">Oct 13</h2>
              </div>
            </div>
          </div>
          <div className="w-full h-[450px] rounded-md bg-gray-200 col-span-2 px-8 py-6 ">
            <h2 className="text-[30px] font-semibold ">Weekly Earnings</h2>
            <div className="h-[370px] ">
              <ChartComp
                key={JSON.stringify(data)}
                data={[50, 100, 150, 200, 250, 300, 350]}
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                label="Earnings ($)"
                backgroundColor="#265598"
              />
            </div>
          </div>
          <div className="w-full h-[450px] rounded-md bg-gray-200 px-8 py-6 ">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-200 pb-2 ">
              Shift Worked
            </h2>
            <div className="h-[calc(100%-3rem)] overflow-y-auto ">
              {data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="mb-3 bg-blue-50 border-l-4 border-[#3b5998] p-4 rounded-lg"
                >
                  <h3 className="font-semibold">{item.day}</h3>
                  <p className="text-gray-600">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
