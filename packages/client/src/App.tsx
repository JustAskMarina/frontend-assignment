import React, { useState } from 'react';
import { Layout } from 'antd';
import { gql } from 'apollo-boost';
import SiderComponent from './components/Sider';
import HeaderComponent from './components/Header';
import ContentComponent from './components/Content';

const App: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('Bug');

    const filterByType = (clicked: string) => {
        clicked == 'All' ? setType('') : setType(clicked);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderComponent currentType={type} onClickCallback={filterByType} />
            <Layout style={{ backgroundColor: '#F0F2F5' }}>
                <HeaderComponent />
                <ContentComponent currentType={type} />
            </Layout>
        </Layout>
    );
};

export default App;
