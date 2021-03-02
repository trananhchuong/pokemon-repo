import { getListGeneration } from '../constant/ApiConstant';
import axiosClient from './axiosClient';

const productApi = {
    getListAll: () => {
        const url = getListGeneration;
        return axiosClient.get(url);
    },
};

export default productApi;