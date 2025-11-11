import { useNavigate } from "react-router-dom";
import { ChartComp } from "../components/Chart";
import data from "../data.json";
import { useEffect, useState } from "react";
import { getPayroll } from "../api/payrollApi";
import OverviewSkeleton from "../components/overviewSkeleton";
// import { useDash } from "../hooks/sideDashContext";

export const Overview = () => {
  // const { setActive } = useDash();
  const navigate = useNavigate();
  const [payData, setPayData] = useState<any>(null);
  // const [formatStartDate, setFormatStartDate] = useState
  console.log(payData);

  useEffect(() => {
    //   const fetchData = async () => {
    //     const result: any = await getPayroll();
    //     console.log(result);
    //     const autoResult = result[result.length - 1];

    //     setPayData(autoResult);
    //   };
    //   fetchData();

    const fetchData = async () => {
      const result: any = await getPayroll();
      console.log(result);

      // Get current week's payroll instead of just the last one
      const currentDate = new Date();
      const currentWeekPayroll = result.find((payroll: any) => {
        const startDate = new Date(payroll.startDate);
        const endDate = new Date(payroll.endDate);
        return currentDate >= startDate && currentDate <= endDate;
      });

      // If no current week payroll, fall back to the most recent one
      setPayData(currentWeekPayroll || result[0]);
    };
    fetchData();
  }, []);
  // console.log(payData.shift);

  const startDate = new Date(payData?.startDate);
  const newStartDate = startDate.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });

  const endDate = new Date(payData?.endDate);
  const newEndDate = endDate.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
  const payDate = new Date(payData?.payDay);
  const newPayDate = payDate.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });

  const formatDate = (date: any) => {
    const newDate = new Date(date);
    const formatDate = newDate.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[formatDate];

    return day;
  };

  return payData ? (
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
          <div className="w-full h-[250px] rounded-md bg-gray-200 col-span-3 px-8 py-6 md:flex justify-between ">
            <h2 className="text-[30px] font-semibold md:mt-[8px] my-[15px] ">
              {newStartDate} - {newEndDate}
            </h2>
            <div className="flex gap-5 items-center">
              <div className="md:w-[280px] md:h-[160px] w-[50%] h-[100px] bg-[#265598] rounded-[12px]  px-6 text-white flex justify-center flex-col items-start  ">
                <h3 className="font-medium md:text-[25px] text-[12px] ">
                  Total Earned
                </h3>
                <h2 className="font-bold md:text-[30px] text-[25px] ">
                  {payData ? `£${payData?.totalAmount?.toFixed(2)}` : "£0"}
                </h2>
              </div>
              <div className="md:w-[280px] md:h-[160px] w-[50%] h-[100px] shadow-md rounded-[12px]  px-6 bg-[whitesmoke] flex justify-center items-start flex-col ">
                <h3 className="font-medium md:text-[25px] text-[12px] ">
                  Next Payday
                </h3>
                <h2 className="font-bold md:text-[30px] text-[25px]  ">
                  {newPayDate}
                </h2>
              </div>
            </div>
          </div>
          <div className="w-full h-[450px] rounded-md bg-gray-200 md:col-span-2 col-span-3 px-8 py-6  ">
            <h2 className="text-[30px] font-semibold ">Weekly Earnings</h2>
            <div className="h-[370px] ">
              <ChartComp
                key={JSON.stringify(data)}
                data={(() => {
                  // Create array with 7 zeros for each day
                  const dayTotals = Array(7).fill(0);

                  // Sum up earnings for each day of the week
                  payData?.shift?.forEach((shift: any) => {
                    const date = new Date(shift.dateworked);
                    const dayIndex = date.getDay(); // 0=Sunday, 1=Monday, etc.
                    dayTotals[dayIndex] += shift.amountEarned;
                  });

                  return dayTotals;
                })()}
                labels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                label="Earnings (£)"
                backgroundColor="#265598"
              />
            </div>
          </div>
          <div className="w-full h-[450px] rounded-md bg-gray-200 px-8 py-6 col-span-3 md:col-span-1 ">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-200 pb-2 ">
              Shift Worked
            </h2>
            <div className="h-[calc(100%-3rem)] overflow-y-auto ">
              {payData?.shift?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="mb-3 bg-blue-50 border-l-4 border-[#3b5998] p-4 rounded-lg"
                >
                  <h3 className="font-semibold">
                    {formatDate(item?.dateworked)}
                  </h3>
                  <p className="text-gray-600">
                    {item.start} - {item.finish}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <OverviewSkeleton />
    </div>
  );
};
