import axios from "axios";
import env from "dotenv";
env.config();

const url: any = process.env.API_URL;

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
