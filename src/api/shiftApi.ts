import axios from "axios";
const url = "http://localhost:4424/api/v1";

export const createShift = async (date: {
  dateworked: string;
  start: string;
  finish: string;
  break: string;
  ratePerHour: number;
}) => {
  try {
    const request = await axios.post(`${url}/create_shift`, {
      dateworked: date.dateworked,
      start: date.start,
      finish: date.finish,
      break: date.break,
      ratePerHour: date.ratePerHour,
    });

    return request.data;
  } catch (error) {
    console.error(error);
  }
};
