import React, { useRef } from 'react';
import { Row, Col, Button, Typography } from 'antd';
import _ from 'lodash';
import PokemonCard from './PokemonCard';
import './styles/pokemonSectionStyles.scss';
import ModalComponent from '../modals/ModalComponent';
import PokemonDetail from './PokemonDetail';

const { Title } = Typography;

function PokemonSection(props: any) {
    const pokemonList = _.get(props, 'pokemonList', []);
    const modalRef: any = useRef(null);

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

        const onDetailClick = (item: any, id: any) => {
            try {
                modalRef.current.setDataChildren(
                    <PokemonDetail dataPokemon={{ ...item, id }} />
                );
                setModalVisible(true);
            } catch (error) {
                console.log('🚀 ~ file: TodoTable.tsx ~ line 169 ~ handleAdd ~ error', error);
            }
        }

        const setModalVisible = (value: boolean): void => {
            modalRef && modalRef.current && modalRef.current.setVisible(value);
        };

        return <>
            <Row>
                {
                    _.map(pokemonList, (item, key) => {
                        const id = getIdFromUrl(item.url);

                        return <Col
                            className="row pokemon-card"
                            sm={18} lg={6}
                            key={id || key}
                            onClick={() => onDetailClick(item, id)}
                        >
                            <PokemonCard pokemonData={{ ...item, id }}
                            />
                        </Col>;
                    })
                }
            </Row>
        </>
    }



    const renderButtonSeeMore = () => {
        return (
            <div className="btn-box">
                <Button type="primary">See More</Button>
            </div>
        );
    };

    const renderModal = () => {
        return (
            <ModalComponent
                ref={modalRef}
            />
        );
    };

    return (
        <div className="pokemon-section-box">
            <Title level={3}>Pokemon Section</Title>

            {renderButtonSeeMore()}
            {renderContent()}
            {renderModal()}
        </div>
    );
}

export default PokemonSection;