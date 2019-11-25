import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

export default function HeaderComponent(props: any) {
    return (
        <Header style={{ backgroundColor: 'white', padding: 0 }}>
            <Title style={{ textAlign: 'center' }}>Pokémon App</Title>
        </Header>
    );
}
