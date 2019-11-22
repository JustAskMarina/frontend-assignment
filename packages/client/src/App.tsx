import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_POKEMON = gql`
    query {
        pokemons(q: "Bulbasaur") {
            edges {
                node {
                    id
                    types
                }
            }
        }
    }
`;

export default function App() {
    const { loading, error, data } = useQuery(GET_POKEMON);
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    return (
        <h1>
            HENLO{' '}
            {data.pokemons.edges.map((el: any) => (
                <div>{el.node.id}</div>
            ))}
            !
        </h1>
    );
}
