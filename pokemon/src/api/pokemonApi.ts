import { getListPokemon } from '../constant/ApiConstant';
import axiosClient from './axiosClient';

const pokemonApi = {
    getListAll: (params: any) => {
        const url = getListPokemon;
        return axiosClient.get(url, { params });
    },

};

export default pokemonApi;