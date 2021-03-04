import React, { useEffect, useState } from 'react';
import Trailers from './Trailers';
import PokemonSection from './PokemonSection';

import './styles/homePage.scss';
import Loading from '../loading/Loading';
import _ from 'lodash';

import pokemonApi from '../../api/pokemonApi';

interface Istate {
    loading: boolean,
    pokemonList: []
}


function HomePage(props: any) {

    const [state, setState] = useState<Istate>({
        loading: true, pokemonList: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {

            const params = {
                limit: 10
            };
            const response = await pokemonApi.getListAll(params);
            const pokemonListRes = _.get(response, 'results');
            setState({
                ...state,
                loading: false,
                pokemonList: pokemonListRes
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
        </div>
    );
}

export default HomePage;