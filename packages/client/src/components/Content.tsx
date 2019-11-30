import React from 'react';
import { Layout, Table, Tag } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const { Content } = Layout;

const GET_POKEMON = gql`
    query($name: String!) {
        pokemons(q: $name) {
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

const GET_POKEMON_BY_TYPE = gql`
    query($type: String!) {
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
        key: 'types',
        render: (types: string[]) => types.map((type: string) => <Tag key={type}>{type}</Tag>)
    },
    {
        title: 'Classification',
        dataIndex: 'classification',
        key: 'classification'
    }
];

const ContentComponent: React.FC<{ currentType: string; searchedName: string }> = ({ currentType, searchedName }) => {
    let query = currentType === '' ? GET_POKEMON : GET_POKEMON_BY_TYPE;
    let vars = currentType === '' ? { name: searchedName } : { type: currentType };
    const { loading, error, data } = useQuery(query, {
        variables: vars
    });

    if (loading) return null;
    if (error) return <p>{'Error' + error}</p>;

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff'
            }}
        >
            <Table
                dataSource={
                    currentType === ''
                        ? data.pokemons.edges.map((el: any) => el.node)
                        : data.pokemonsByType.edges.map((el: any) => el.node)
                }
                columns={columns}
                rowKey='id'
            />
        </Content>
    );
};

export default ContentComponent;
