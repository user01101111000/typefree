import axios, { AxiosResponse } from "axios";

const get_json_data: (url: string) => Promise<unknown> = async (url: string): Promise<unknown> => {
    const response: AxiosResponse<unknown> = await axios.get(url);
    return response.data;
};

export default get_json_data;