import { Typography, Card, Row, Col } from 'antd';
import React from 'react';
import _ from 'lodash';

import './styles/itemSection.scss';

const { Title } = Typography;
const { Meta } = Card;

function ItemsSection(props: any) {

    const { itemList } = props;

    const renderContent = () => {
        return <Row>
            {
                _.map(itemList, (item, key) => {
                    const name = item.name;

                    return <Col
                        className="row pokemon-card"
                        sm={18} lg={6}
                        key={key}
                    >
                        <Card
                            hoverable
                            style={{ width: 240, marginBottom: 10 }}
                            cover={<img alt="example" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`} />}
                        >
                            <Meta title={name} style={{ alignItems: 'center' }} />
                        </Card>
                    </Col>;
                })
            }
        </Row>
    }

    return (
        <div className="items-section-box">
            <Title level={3}>Items Section</Title>
            {renderContent()}
        </div>
    );
}

export default ItemsSection;