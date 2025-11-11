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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<iData>({
    date: "",
    day: "",
    startTime: "",
    endTime: "",
    hourlyRate: 13.75,
    shiftType: "Paid Break",
  });

  const handleDateChange = (e: any) => {
    const date = e.target.value;
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const getDate = new Date(date);
    const getDay = dayNames[getDate.getDay()];

    setFormData({ ...formData, date: date, day: getDay });
    setError(""); // Clear error when user makes changes
  };

  const getHours = () => {
    if (!formData.startTime || !formData.endTime) return 0;

    const start = new Date(`2000-01-01 ${formData.startTime}`);
    const end = new Date(`2000-01-01 ${formData.endTime}`);
    let diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (diff < 0) {
      diff += 24;
    }

    if (formData.shiftType.toLowerCase() === "unpaid break") {
      diff -= 1;
    }

    return diff;
  };

  const hours = getHours();
  const earnings = hours * formData.hourlyRate;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validation
    if (!formData.date || !formData.startTime || !formData.endTime) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);

      const { date, startTime, endTime, shiftType, hourlyRate } = formData;
      const result = await createShift({
        dateworked: date,
        start: startTime,
        finish: endTime,
        break: shiftType,
        ratePerHour: hourlyRate,
      });

      console.log("Shift created:", result);
      navigate("/");
    } catch (error: any) {
      console.error("Error creating shift:", error);
      setError(error.message || "Failed to create shift. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] mt-6">
        <div className="flex gap-5">
          <button
            onClick={() => window.history.back()}
            className="mt-3 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            ← Back
          </button>
          <div>
            <h1 className="font-bold text-[20px] md:text-[40px]">
              Add New Shifts
            </h1>
            <p className="text-[9px] md:text-[18px]">
              Record your work hours and earnings
            </p>
          </div>
        </div>

        <div className="w-full rounded-md shadow-lg bg-white min-h-[65vh] mt-[50px] p-7">
          {/* Error Message Banner */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800">Error</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
                <button
                  onClick={() => setError("")}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleDateChange}
              require={true}
            />

            {formData.day && (
              <p className="text-sm text-gray-600 -mt-3">
                Day: <span className="font-semibold">{formData.day}</span>
              </p>
            )}

            <div className="flex w-full gap-4">
              <Input
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e: any) => {
                  setFormData({ ...formData, startTime: e.target.value });
                  setError("");
                }}
                require={true}
              />
              <Input
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e: any) => {
                  setFormData({ ...formData, endTime: e.target.value });
                  setError("");
                }}
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shift Type
              </label>
              <select
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#265598] focus:border-transparent outline-none"
                value={formData.shiftType}
                onChange={(e) =>
                  setFormData({ ...formData, shiftType: e.target.value })
                }
              >
                <option value="Paid Break">Paid Break</option>
                <option value="Unpaid Break">Unpaid Break</option>
              </select>
            </div>

            <Input
              label="$ Hourly Rate"
              type="number"
              value={formData.hourlyRate}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  hourlyRate: parseFloat(e.target.value) || 0,
                })
              }
              require={true}
            />

            {earnings > 0 && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <p className="text-sm text-gray-700 mb-1">Total Earnings</p>
                <p className="text-4xl font-bold text-green-600">
                  £{earnings.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {hours.toFixed(2)} hours × £{formData.hourlyRate}/hr
                </p>
              </div>
            )}

            <div className="w-full flex gap-4 mt-8">
              <button
                type="button"
                className="py-3 px-9 border-2 border-gray-300 w-full rounded-md hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => window.history.back()}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-4 border w-full rounded-md bg-[#265598] hover:bg-[#1d4173] text-white cursor-pointer font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
