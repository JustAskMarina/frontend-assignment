import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Layout, Input, Menu } from 'antd';

const { Sider } = Layout;
const { Search } = Input;

const GET_POKEMON_TYPES = gql`
    query {
        pokemons(limit: 150) {
            edges {
                node {
                    types
                }
            }
        }
    }
`;

export default function SiderComponent(props: any) {
    const { loading, error, data } = useQuery(GET_POKEMON_TYPES);
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    let types = [...new Set(data.pokemons.edges.flatMap((el: any) => el.node.types))].sort();
    types.unshift('All');

    return (
        <Sider breakpoint='lg' collapsedWidth='0'>
            <Search
                placeholder='Search by name'
                onSearch={(value) => console.log(value)}
                style={{ width: 168, margin: 16 }}
            />
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['0']}>
                {types.map((type: any, index: number) => {
                    return (
                        <Menu.Item key={index}>
                            <span className='nav-text'>{type}</span>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Sider>
    );
}
