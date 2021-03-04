import { getListItemUrl } from '../constant/ApiConstant';
import axiosClient from './axiosClient';

const itemApi = {
    getListAll: (params: any) => {
        const url = getListItemUrl;
        return axiosClient.get(url, { params });
    },

};

export default itemApi;