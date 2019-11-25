import React from 'react';
import { Layout, Typography, Icon } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

export default function HeaderComponent(props: any) {
    return (
        <Header style={{ backgroundColor: '#fff', padding: 0 }}>
            <Icon
                type='menu-fold'
                style={{
                    fontSize: 24,
                    lineHeight: '64px',
                    padding: '0 24px',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    float: 'left'
                }}
            />
            <Title style={{ textAlign: 'center', position: 'relative', left: '-36px' }}>Pokémon App</Title>
        </Header>
    );
}
