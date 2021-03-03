import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

function PokemonCard(props: any) {

    const { pokemonData } = props;

    return (
        <div className="pokemon-card">
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/1.png?raw=true" />}
            >
                <Meta title={pokemonData.name} style={{ alignItems: 'center' }} />
            </Card>
        </div>
    );
}

export default PokemonCard;