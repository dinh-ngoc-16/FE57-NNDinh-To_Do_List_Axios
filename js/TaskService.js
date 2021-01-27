import { URL_API } from "./constant.js";

const callAPI = (uri, method, data) => {
  return axios({
    url: `${URL_API}/${uri}`,
    method,
    data,
  });
};

export { callAPI };
