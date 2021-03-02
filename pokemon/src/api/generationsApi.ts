import axiosClient from './axiosClient';

const productApi = {
    getAll: () => {
        const url = 'api/group';
        return axiosClient.get(url);
    },

    get: (id: any) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
};

export default productApi;