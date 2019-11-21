import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_POKEMON = gql`
    query {
        movie(id: 1) {
            id
            title
        }
    }
`;

export const App: React.FC = () => (
    <Query query={GET_POKEMON}>
        {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;

            return <div>{data}</div>;
        }}
    </Query>
);
