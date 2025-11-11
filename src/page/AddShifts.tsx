import { useState } from "react";
import { Input } from "../components/Input";
import { createShift } from "../api/shiftApi";
import { useNavigate } from "react-router-dom";

interface iData {
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  shiftType: string;
}

export const AddShifts = () => {
  const [formData, setFormData] = useState<iData>({
    date: "",
    day: "",
    startTime: "",
    endTime: "",
    hourlyRate: 13.75,
    shiftType: "",
  });

  const handleDateChange = (e: any) => {
    const date = e.target.value;
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const getDate = new Date(date);
    const getDay = day[getDate.getDay()];

    setFormData({ ...formData, date: date, day: getDay });

    // return getDay;
  };

  const getHours = () => {
    const start = new Date(`2000-01-01 ${formData.startTime}`);
    const end = new Date(`2000-01-01 ${formData.endTime}`);
    let diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (formData.shiftType.toLowerCase() === "unpaid break") {
      diff -= 1;
    }
    return diff;
  };
  const hours: any = getHours();
  const earnings = hours * formData.hourlyRate;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // const shift = { ...formData, hours, earnings };
    const { date, startTime, endTime, shiftType, hourlyRate } = formData;
    const result = await createShift({
      dateworked: date,
      start: startTime,
      finish: endTime,
      break: shiftType,
      ratePerHour: hourlyRate,
    });
    // window.history.back();
    navigate("/");
    console.log(result);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center ">
      <div className="w-[90%] mt-6  ">
        <div className="flex  gap-5">
          <div onClick={() => window.history.back()} className="mt-3">
            back
          </div>
          <div>
            <h1 className="font-bold text-[20px] md:text-[40px]">
              Add New Shifts
            </h1>
            <p className="text-[9px] md:text-[18px]">
              Record your work hours and earnings
            </p>
          </div>
        </div>

        <div className="w-[100%] rounded-md shadow-lg bg-white min-h-[65vh] mt-[50px] p-7">
          <form>
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleDateChange}
              require={true}
            />
            {formData.day && (
              <p className="text-sm text-gray-600 my-1">
                Day: <span className="font-semibold">{formData.day}</span>
              </p>
            )}
            <div className="flex w-full gap-4 ">
              <Input
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e: any) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                require={true}
              />
              <Input
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e: any) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                require={true}
              />
            </div>
            {hours > 0 && (
              <div className="bg-blue-50 border-l-4 border-[#265598] p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  Total Hours:{" "}
                  <span className="font-bold text-[#265598]">
                    {hours.toFixed(2)} hours
                  </span>
                </p>
              </div>
            )}

            <label htmlFor="" className="mb-3 block">
              {" "}
              Shift Type
            </label>
            <select
              name=""
              id=""
              className="w-full p-4 border rounded-md mb-4"
              value={formData.shiftType}
              onChange={(e) =>
                setFormData({ ...formData, shiftType: e.target.value })
              }
            >
              <option>Paid Break</option>
              <option>Unpaid Break</option>
            </select>
            <Input
              label="$ Hourly Rate"
              type="number"
              value={formData.hourlyRate}
              onChange={(e: any) =>
                setFormData({ ...formData, hourlyRate: e.target.value })
              }
              require={true}
            />

            {earnings > 0 && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <p className="text-sm text-gray-700 mb-1">Total Earnings</p>
                <p className="text-4xl font-bold text-green-600">
                  ${earnings.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {hours.toFixed(2)} hours * ${formData.hourlyRate}/hr
                </p>
              </div>
            )}
            <div className="w-full flex gap-4 mt-5 ">
              <button
                className="py-3 px-9 border w-full rounded-md "
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                className="py-4 border w-full rounded-md bg-[#265598] text-white cursor-pointer "
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
