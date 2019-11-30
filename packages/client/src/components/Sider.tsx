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

const SiderComponent: React.FC<{ currentType: string; searchedName: string; filterByName: any; filterByType: any }> = ({
    currentType,
    searchedName,
    filterByName,
    filterByType
}) => {
    const { loading, error, data } = useQuery(GET_POKEMON_TYPES);
    if (loading) return null;
    if (error) return <p>{'Error' + error}</p>;
    let types = [...new Set(data.pokemons.edges.flatMap((el: any) => el.node.types))].sort();
    types.unshift('All');

    return (
        <Sider breakpoint='lg' collapsedWidth='0'>
            <Search placeholder='Search by name' onSearch={filterByName} style={{ width: 168, margin: 16 }} />
            <Menu
                theme='dark'
                mode='inline'
                onClick={filterByType}
                defaultSelectedKeys={
                    currentType === '' ? [types.indexOf('All').toString()] : [types.indexOf(currentType).toString()]
                }
            >
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
};
export default SiderComponent;
