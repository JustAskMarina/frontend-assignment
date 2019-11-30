import React from 'react';
import { Layout, Table, Divider } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const { Content } = Layout;

const GET_POKEMON = gql`
    query {
        pokemons {
            edges {
                node {
                    id
                    name
                    types
                    classification
                }
            }
        }
    }
`;

const GET_POKEMON_TYPES = gql`
    query {
        pokemonsByType(type: $type) {
            edges {
                node {
                    id
                    name
                    types
                    classification
                }
            }
        }
    }
`;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Types',
        dataIndex: 'types',
        key: 'types'
    },
    {
        title: 'Classification',
        dataIndex: 'classification',
        key: 'classification'
    }
];

const ContentComponent: React.FC<{ currentType: string }> = ({ currentType }) => {
    const { loading, error, data } = useQuery(GET_POKEMON);
    //useQuery(GET_POKEMON_TYPES, { variables: { type: currentType } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    console.log(data);

    return (
        <Content
            style={{
                margin: '0 16px',
                padding: 24,
                background: '#fff'
            }}
        >
            <Table dataSource={data.pokemons.edges.map((el: any) => el.node)} columns={columns} />
        </Content>
    );
};

export default ContentComponent;
