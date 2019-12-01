import React from 'react';
import { Layout, Table, Tag, Button } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const { Content } = Layout;

const GET_POKEMON = gql`
    query($name: String!, $limit: Int) {
        pokemons(q: $name, limit: $limit) {
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
    query($type: String!, $limit: Int) {
        pokemonsByType(type: $type, limit: $limit) {
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

const ContentComponent: React.FC<{ currentType: string; searchedName: string; limit: number; setLimit: any }> = ({
    currentType,
    searchedName,
    limit,
    setLimit
}) => {
    let query = currentType === '' ? GET_POKEMON : GET_POKEMON_BY_TYPE;
    let vars = currentType === '' ? { name: searchedName, limit: limit } : { type: currentType, limit: limit };
    const { loading, error, data } = useQuery(query, {
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
                <Button type='primary' size='large' onClick={setLimit} style={{ margin: '24px auto' }}>
                    Load More
                </Button>
            )}
        </Content>
    );
};

export default ContentComponent;
