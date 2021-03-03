import React, { useEffect, useState } from 'react';
import pokemonApi from '../../api/pokemonApi';
import Loading from '../loading/Loading';
import _ from 'lodash';
import AppUtil from '../../Utils/AppUtil';
import { Row, Col, Divider, Card } from 'antd';
import './styles/pokemonDetail.scss';

interface Istate {
    loading: boolean,
    dataDetail: any
}

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

function PokemonDetail(props: any) {
    const url = _.get(props, 'dataPokemon.url');
    const id = _.get(props, 'dataPokemon.id', "");

    const [state, setState] = useState<Istate>({
        loading: true, dataDetail: {
            name: '',
            pokemonIndex: '',
            imageUrl: '',
            types: [],
            description: '',
            statTitleWidth: 3,
            statBarWidth: 9,
            stats: {
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                specialAttack: '',
                specialDefense: ''
            },
            height: '',
            weight: '',
            eggGroups: '',
            catchRate: '',
            abilities: '',
            genderRatioMale: '',
            genderRatioFemale: '',
            evs: '',
            hatchSteps: '',
            themeColor: '#EF5350'
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const getDataFormDataRes = (dataDetailRes: any, dataSpecies: any) => {
        try {

            const name = _.get(dataDetailRes, 'name', '');
            const imageUrl = _.get(dataDetailRes, 'sprites.front_default', '');

            let hp, attack, defense, speed, specialAttack, specialDefense, description = '';

            dataDetailRes.stats.map((stat: any) => {
                switch (stat.stat.name) {
                    case 'hp':
                        hp = stat['base_stat'];
                        break;
                    case 'attack':
                        attack = stat['base_stat'];
                        break;
                    case 'defense':
                        defense = stat['base_stat'];
                        break;
                    case 'speed':
                        speed = stat['base_stat'];
                        break;
                    case 'special-attack':
                        specialAttack = stat['base_stat'];
                        break;
                    case 'special-defense':
                        specialDefense = stat['base_stat'];
                        break;
                    default:
                        break;
                }
            });

            const height = Math.round((dataDetailRes.height * 0.328084 + 0.00001) * 100) / 100;
            const weight = Math.round((dataDetailRes.weight * 0.220462 + 0.00001) * 100) / 100;
            const types = dataDetailRes.types.map((type: any) => type.type.name);
            const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

            const abilities = dataDetailRes.abilities
                .map((ability: any) => {
                    return ability.ability.name
                        .toLowerCase()
                        .split('-')
                        .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                })
                .join(', ');

            const evs = dataDetailRes.stats
                .filter((stat: any) => {
                    if (stat.effort > 0) {
                        return true;
                    }
                    return false;
                })
                .map((stat: any) => {
                    return `${stat.effort} ${stat.stat.name
                        .toLowerCase()
                        .split('-')
                        .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}`;
                })
                .join(', ');


            dataSpecies.flavor_text_entries.some((flavor: any) => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });

            const femaleRate = dataSpecies['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100 / 255) * dataSpecies['capture_rate']);

            const eggGroups = dataSpecies['egg_groups']
                .map((group: any) => {
                    return group.name
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                })
                .join(', ');

            const hatchSteps = 255 * (dataSpecies['hatch_counter'] + 1);

            return {
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps,
                imageUrl,
                pokemonIndex: id,
                name,
                types,
                stats: {
                    hp,
                    attack,
                    defense,
                    speed,
                    specialAttack,
                    specialDefense
                },
                themeColor,
                height,
                weight,
                abilities,
                evs
            }


        } catch (error) {
            console.log("🚀 ~ file: PokemonDetail.tsx ~ line 72 ~ getDataFormDataRes ~ error", error)
        }
    };

    const fetchData = async () => {
        try {
            const reponseData = await AppUtil.Axios.all([
                pokemonApi.getDataDetail(url),
                pokemonApi.getPokemonSpeciesUrl(id)
            ]);
            const dataDetailTransform = getDataFormDataRes(reponseData[0], reponseData[1]);

            setState({
                ...state,
                loading: false,
                dataDetail: dataDetailTransform!
            })

        } catch (error) {
            console.log(error);
        }
    };

    if (state.loading)
        return <Loading />;

    return (
        <div className="pokemon-detail">
            <div className="badge-box">
                {state.dataDetail.types.map(type => (
                    <span
                        key={type}
                        className="badge badge-pill mr-1"
                        style={{
                            backgroundColor: `#${TYPE_COLORS[type]}`,
                            color: 'white'
                        }}
                    >
                        {type
                            .toLowerCase()
                            .split(' ')
                            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' ')}
                    </span>
                ))}
            </div>

            <Row>
                <Col span={8} className="pokemon-ava">
                    <img
                        src={state.dataDetail.imageUrl}
                        className="card-img-top rounded mx-auto mt-2"
                    />
                </Col>

                <Col span={16} className="pokemon-charizard">
                    <div className="col-md-9">
                        <h4 className="mx-auto">
                            {state.dataDetail.name
                                .toLowerCase()
                                .split(' ')
                                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ')}
                        </h4>
                        <div className="row align-items-center">
                            <div className={`col-12 col-md-${state.dataDetail.statTitleWidth}`}>
                                HP
                            </div>
                            <div className={`col-12 col-md-${state.dataDetail.statBarWidth}`}>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${state.dataDetail.stats.hp}%`,
                                            backgroundColor: `#${state.dataDetail.themeColor}`
                                        }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <small>{state.dataDetail.stats.hp}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className={`col-12 col-md-${state.dataDetail.statTitleWidth}`}>
                                Attack
                            </div>
                            <div className={`col-12 col-md-${state.dataDetail.statBarWidth}`}>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${state.dataDetail.stats.attack}%`,
                                            backgroundColor: `#${state.dataDetail.themeColor}`
                                        }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <small>{state.dataDetail.stats.attack}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className={`col-12 col-md-${state.dataDetail.statTitleWidth}`}>
                                Defense
                  </div>
                            <div className={`col-12 col-md-${state.dataDetail.statBarWidth}`}>
                                <div className="progress">
                                    <div
                                        className="progress-bar "
                                        role="progressbar"
                                        style={{
                                            width: `${state.dataDetail.stats.defense}%`,
                                            backgroundColor: `#${state.dataDetail.themeColor}`
                                        }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <small>{state.dataDetail.stats.defense}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className={`col-12 col-md-${state.dataDetail.statTitleWidth}`}>
                                Speed
                  </div>
                            <div className={`col-12 col-md-${state.dataDetail.statBarWidth}`}>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${state.dataDetail.stats.speed}%`,
                                            backgroundColor: `#${state.dataDetail.themeColor}`
                                        }}
                                        aria-valuenow={25}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <small>{state.dataDetail.stats.speed}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className={`col-12 col-md-${state.dataDetail.statTitleWidth}`}>
                                Sp Atk
                  </div>
                            <div className={`col-12 col-md-${state.dataDetail.statBarWidth}`}>
                                <div className="progress">
                                    <div
                                        className="progress-bar "
                                        role="progressbar"
                                        style={{
                                            width: `${state.dataDetail.stats.specialAttack}%`,
                                            backgroundColor: `#${state.dataDetail.themeColor}`
                                        }}
                                        aria-valuenow={state.dataDetail.stats.specialAttack}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <small>{state.dataDetail.stats.specialAttack}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className={`col-12 col-md-${state.dataDetail.statTitleWidth}`}>
                                Sp Def
                  </div>
                            <div className={`col-12 col-md-${state.dataDetail.statBarWidth}`}>
                                <div className="progress">
                                    <div
                                        className="progress-bar "
                                        role="progressbar"
                                        style={{
                                            width: `${state.dataDetail.stats.specialDefense}%`,
                                            backgroundColor: `#${state.dataDetail.themeColor}`
                                        }}
                                        aria-valuenow={state.dataDetail.stats.specialDefense}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <small>{state.dataDetail.stats.specialDefense}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Card className="profile">
                <div className="profile-title">Profile</div>
                <Row className="profile-content">
                    <Col span={12}>
                        <div className="pokemon-parameter">
                            <div className="title">
                                Height:
                            </div>
                            <div className="result">
                                {state.dataDetail.height} ft.
                            </div>
                        </div>
                        <div className="pokemon-parameter">
                            <div className="title">
                                Weight:
                            </div>
                            <div className="result">
                                {state.dataDetail.weight} lbs
                            </div>
                        </div>
                        <div className="pokemon-parameter">
                            <div className="title">
                                Catch Rate:
                            </div>
                            <div className="result">
                                {state.dataDetail.catchRate}%
                            </div>
                        </div>
                        <div className="pokemon-parameter" style={{ flexDirection: "column" }}>
                            <div className="title">
                                Gender Ratio:
                            </div>
                            <div className="result">
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${state.dataDetail.genderRatioFemale}%`,
                                            backgroundColor: '#c2185b'
                                        }}
                                        aria-valuenow={15}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <small>{state.dataDetail.genderRatioFemale}</small>
                                    </div>
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${state.dataDetail.genderRatioMale}%`,
                                            backgroundColor: '#1976d2'
                                        }}
                                        aria-valuenow={30}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <small>{state.dataDetail.genderRatioMale}</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Col>
                    <Col span={12}>
                        <div className="pokemon-parameter">
                            <div className="title">
                                Egg Groups:
                            </div>
                            <div className="result">
                                {state.dataDetail.eggGroups}
                            </div>
                        </div>

                        <div className="pokemon-parameter">
                            <div className="title">
                                Hatch Steps:
                            </div>
                            <div className="result">
                                {state.dataDetail.hatchSteps}
                            </div>
                        </div>

                        <div className="pokemon-parameter">
                            <div className="title">
                                Abilities:
                            </div>
                            <div className="result">
                                {state.dataDetail.abilities}
                            </div>
                        </div>

                        <div className="pokemon-parameter">
                            <div className="title">
                                EVs:
                            </div>
                            <div className="result">
                                {state.dataDetail.evs}
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="card-footer">
                    Data From{' '}
                    <a href="https://pokeapi.co/" target="_blank" className="card-link">
                        PokeAPI.co
                    </a>
                </div>
            </Card>
        </div>
    );
}

export default PokemonDetail;