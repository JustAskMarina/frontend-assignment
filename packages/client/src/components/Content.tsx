import React, { useState } from 'react';
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
    //const [limit, setLimit] = useState('10');
    let query = currentType === '' ? GET_POKEMON : GET_POKEMON_BY_TYPE;
    let vars = currentType === '' ? { name: searchedName, after: '000' } : { type: currentType };
    const { loading, error, data, fetchMore } = useQuery(query, {
        variables: vars
    });
    if (loading) return null;
    if (error) return <p>{'Error' + error}</p>;

    const { pageInfo, edges } = currentType === '' ? data.pokemons : data.pokemonsByType;

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
                            variables: {
                                after: pageInfo.endCursor
                            },
                            updateQuery: (prev: any, { fetchMoreResult }) => {
                                console.log(edges, fetchMoreResult);
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
