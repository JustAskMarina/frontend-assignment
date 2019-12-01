import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const HeaderComponent: React.FC = () => {
    return (
        <Header style={{ backgroundColor: '#fff', padding: 0, textAlign: 'center' }}>
            <Title>Pokémon App</Title>
        </Header>
    );
};

export default HeaderComponent;
