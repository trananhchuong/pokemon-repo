import { getListPokemon, pokemonSpeciesUrl } from '../constant/ApiConstant';
import axiosClient from './axiosClient';

const pokemonApi = {
    getListAll: (params: any) => {
        const url = getListPokemon;
        return axiosClient.get(url, { params });
    },

    getDataDetail: (url: string) => {
        return axiosClient.get(url);
    },

    getPokemonSpeciesUrl: (params: any) => {
        const url = `${pokemonSpeciesUrl}/${params}`;
        return axiosClient.get(url);
    },

};

export default pokemonApi;