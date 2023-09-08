import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const apiPet = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_PET,
});

if (token) {
  apiPet.defaults.headers["Authorization"] = `Bearer ${token}`;
}
