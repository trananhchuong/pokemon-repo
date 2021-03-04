import React, { useEffect, useState } from 'react';
import Trailers from './Trailers';
import PokemonSection from './PokemonSection';

import './styles/homePage.scss';
import Loading from '../loading/Loading';
import _ from 'lodash';

import pokemonApi from '../../api/pokemonApi';
import ItemsSection from './ItemsSection';
import AppUtil from '../../Utils/AppUtil';
import itemApi from '../../api/itemApi';

interface Istate {
    loading: boolean,
    pokemonList: [],
    itemList: []
}


function HomePage(props: any) {

    const [state, setState] = useState<Istate>(
        {
            loading: true,
            pokemonList: [],
            itemList: []
        }
    );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const params = {
                limit: 10
            };

            const responseData = await AppUtil.Axios.all([
                pokemonApi.getListAll(params),
                itemApi.getListAll(params)
            ]);

            const pokemonListRes = _.get(responseData[0], 'results');
            const itemListRes = _.get(responseData[1], 'results');

            setState({
                ...state,
                loading: false,
                pokemonList: pokemonListRes,
                itemList: itemListRes
            })

        } catch (error) {
            console.log(error);
        }
    };


    const renderTrailers = () => {
        return <Trailers />;
    }

    const renderPokemonSection = () => {
        return <PokemonSection pokemonList={state.pokemonList} />;
    }

    const renderItemsSection = () => {
        return <ItemsSection itemList={state.itemList}/>;
    }

    if (state.loading)
        return <Loading />;

    return (
        <div className="home-page">
            <div className="trailers-section">
                {renderTrailers()}
            </div>
            <div className="pokemon-section">
                {renderPokemonSection()}
            </div>
            <div className="items-section">
                {renderItemsSection()}
            </div>
        </div>
    );
}

export default HomePage;