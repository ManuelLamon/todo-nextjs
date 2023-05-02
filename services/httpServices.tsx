import Axios from "axios";
import AxiosEndPointsConfig from "../utils/axiosConfig";

type Methods = "get" | "post" | "put" | "delete";

const CreateResponse = async (method: Methods, host: string, url: string, req: any, headers?: any) => {
  try {
    let response;
    if (method === "get") {
      response = await Axios[method](`${AxiosEndPointsConfig}${url}`, { headers });
    } else {
      response = await Axios[method](`${AxiosEndPointsConfig}${url}`, req, { headers, timeout: 6000 });
    }
    return response.data;
  } catch (error) {
    return {};
  }
};

export default CreateResponse;
