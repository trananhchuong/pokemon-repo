import React from 'react';
import { Row, Col, Divider, Typography } from 'antd';
import _ from 'lodash';
import PokemonCard from './PokemonCard';
import './styles/pokemonSectionStyles.scss';

const { Title } = Typography;

function PokemonSection(props: any) {
    const pokemonList = _.get(props, 'pokemonList', []);

    const renderContent = () => {

        const getIdFromUrl = (url: string) => {
            try {
                if (!url)
                    return "";

                const key = "pokemon";
                const indexOfPokemon = url.indexOf(key);
                const subStringPokemon = url.substring(indexOfPokemon, url.length - 1);

                const result = subStringPokemon.replace(key + "/", "");
                return result;
            } catch (error) {
                console.log("🚀 ~ file: PokemonSection.tsx ~ line 17 ~ getIdFromUrl ~ error", error)
            }
        }

        return <>
            <Row>
                {
                    _.map(pokemonList, (item, key) => {
                        const id = getIdFromUrl(item.url);
                        return <Col className="row pokemon-card" sm={18} lg={6} key={id || key}>
                            <PokemonCard pokemonData={{ ...item, id }}
                            />
                        </Col>;
                    })
                }
            </Row>
        </>
    }

    return (
        <div className="pokemon-section-box">
            <Title level={3}>Pokemon Section</Title>
            {renderContent()}

        </div>
    );
}

export default PokemonSection;