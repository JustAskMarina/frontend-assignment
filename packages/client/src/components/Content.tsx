import React from 'react';
import { Layout } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { response } from 'express';

const { Content } = Layout;

const GET_POKEMON = gql`
    query {
        pokemons {
            edges {
                node {
                    id
                    name
                    types
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
                }
            }
        }
    }
`;

const ContentComponent: React.FC<{ currentType: string }> = ({ currentType }) => {
    const { loading, error, data } = useQuery(GET_POKEMON);
    //useQuery(GET_POKEMON_TYPES, { variables: { type: currentType } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <Content
            style={{
                margin: '0 16px',
                padding: 24,
                background: '#fff'
            }}
        >
            {data.pokemons.edges.map((el: any) => (
                <div>{el.node.name}</div>
            ))}
        </Content>
    );
};

export default ContentComponent;
