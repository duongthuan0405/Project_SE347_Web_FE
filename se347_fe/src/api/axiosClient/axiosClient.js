import tokenHelper from "@/helper/tokenHelper";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BARE_URL_BE,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(function (config) {
  const token = tokenHelper.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response || error);
  }
);

export default axiosClient;

/*
axiosError {
  ...
  ...
  status,
  
  response {
    status: 4xx, 5xx,
    data { message from server, ....}
  },

  request {
    responseURL: endpoint API 
  }

}

axiosResponse {
  data: {...},        // dữ liệu trả về từ server (body)
  status: 200,        // mã HTTP
  statusText: "OK",
  headers: {...},     // header trả về
  config: {...},      // cấu hình request
  request: {...},     // request object
}

*/
