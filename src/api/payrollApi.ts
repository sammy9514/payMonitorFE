import axios from "axios";

const url = "http://localhost:4424/api/v1/payroll";

export const createPayroll = async (pastWeeks: number, futureWeek: number) => {
  try {
    const result: any = await axios.post(`${url}/create_payroll`, {
      pastWeeks: pastWeeks,
      futureWeek: futureWeek,
    });
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPayroll = async () => {
  try {
    const result: any = await axios.get(`${url}/get_payroll`);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
