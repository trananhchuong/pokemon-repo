import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

function PokemonCard(props: any) {
    const { name, id } = props.pokemonData;
    return (
        <div className="pokemon-card">
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png?raw=true`} />}
            >
                <Meta title={name} style={{ alignItems: 'center' }} />
            </Card>
        </div>
    );
}

export default PokemonCard;