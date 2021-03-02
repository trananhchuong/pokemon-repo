import axiosClient from './axiosClient';
import {logoutApi} from '../constant/ApiConstant';

const loginApi = {
    logout: () => {
        const url = logoutApi;
        return axiosClient.get(url);
    },
};

export default loginApi;