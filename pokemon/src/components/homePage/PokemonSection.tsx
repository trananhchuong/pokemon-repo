import React from 'react';
import { Row, Col, Divider, Typography } from 'antd';
import _ from 'lodash';
import PokemonCard from './PokemonCard';
import './styles/pokemonSectionStyles.scss';

const { Title } = Typography;

function PokemonSection(props: any) {
    const pokemonList = _.get(props, 'pokemonList', []);

    const renderContent = () => {

        return <>
            <Row>
                {
                    _.map(pokemonList, (item) => {
                        console.log("🚀 ~ file: PokemonSection.tsx ~ line 18 ~ _.map ~ item", item)

                        return <Col className="row pokemon-card" sm={16} lg={6} >
                            <PokemonCard pokemonData={item} />
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