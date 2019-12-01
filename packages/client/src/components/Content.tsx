import React from 'react';
import { Layout, Table, Tag, Button } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const { Content } = Layout;

const GET_POKEMON = gql`
    query($name: String!, $after: ID) {
        pokemons(q: $name, after: $after) {
            edges {
                node {
                    id
                    name
                    types
                    classification
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

const GET_POKEMON_BY_TYPE = gql`
    query($type: String!, $after: ID) {
        pokemonsByType(type: $type, after: $after) {
            edges {
                node {
                    id
                    name
                    types
                    classification
                }
            }
            pageInfo {
                endCursor
                hasNextPage
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
    let query = currentType ? GET_POKEMON_BY_TYPE : GET_POKEMON;
    let vars = currentType ? { type: currentType, after: null } : { name: searchedName, after: null };
    const { loading, error, data, fetchMore } = useQuery(query, {
        variables: vars
    });
    if (loading) return null;
    if (error) return <p>{'Error' + error}</p>;

    const { pageInfo, edges } = currentType ? data.pokemonsByType : data.pokemons;

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                textAlign: 'center'
            }}
        >
            <Table dataSource={edges.map((el: any) => el.node)} columns={columns} rowKey='id' pagination={false} />

            {pageInfo.hasNextPage && (
                <Button
                    type='primary'
                    size='large'
                    onClick={() => {
                        fetchMore({
                            query: query,
                            variables: currentType
                                ? { type: currentType, after: pageInfo.endCursor }
                                : { name: searchedName, after: pageInfo.endCursor },
                            updateQuery: (prev: any, { fetchMoreResult }) => {
                                let prevEdges = prev[currentType ? 'pokemonsByType' : 'pokemons'].edges;
                                let newEdges = fetchMoreResult[currentType ? 'pokemonsByType' : 'pokemons'].edges;
                                let merge = Object.assign({}, prev, fetchMoreResult);
                                merge[currentType ? 'pokemonsByType' : 'pokemons'].edges = [...prevEdges, ...newEdges];
                                return merge;
                            }
                        });
                    }}
                    style={{ margin: '24px auto' }}
                >
                    Load More
                </Button>
            )}
        </Content>
    );
};

export default ContentComponent;
