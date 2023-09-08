import { AxiosError, isAxiosError } from "axios";

type ErrorApi = {
  error: string;
};

type ErrorResponse = {
  error: string;
  status: number;
};

export default function handleErrorRequest(error: unknown | AxiosError) {
  let response: ErrorResponse = {
    error: "Sorry, there was an error, please try again later.",
    status: 500,
  };
  
  if (isAxiosError(error) && error.response) {
    response.error = (error.response?.data as ErrorApi).error;
    response.status = error.response.status;
  }

  return response;
}
