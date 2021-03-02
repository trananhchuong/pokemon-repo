import { getListVersions } from '../constant/ApiConstant';
import axiosClient from './axiosClient';

const versionsApi = {
    getListAll: (params: any) => {
        const url = getListVersions;
        return axiosClient.get(url, { params });
    },
};

export default versionsApi;