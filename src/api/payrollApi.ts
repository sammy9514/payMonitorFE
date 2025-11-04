import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const createPayroll = async (pastWeeks: number, futureWeek: number) => {
  try {
    const result: any = await axios.post(
      `${url}/api/v1/payroll/create_payroll`,
      {
        pastWeeks: pastWeeks,
        futureWeek: futureWeek,
      }
    );
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPayroll = async () => {
  try {
    const result: any = await axios.get(`${url}/api/v1/payroll/get_payroll`);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
