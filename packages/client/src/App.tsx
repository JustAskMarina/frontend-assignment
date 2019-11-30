import React, { useState } from 'react';
import { Layout } from 'antd';
import { gql } from 'apollo-boost';
import SiderComponent from './components/Sider';
import HeaderComponent from './components/Header';
import ContentComponent from './components/Content';

const App: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');

    const filterByType = (clicked: string) => {
        clicked === 'All' ? setType('') : setType(clicked);
    };

    const filterByName = (searched: string) => {
        setName(searched);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderComponent
                currentType={type}
                searchedName={name}
                filterByName={filterByName}
                filterByType={filterByType}
            />
            <Layout style={{ backgroundColor: '#F0F2F5' }}>
                <HeaderComponent />
                <ContentComponent currentType={type} searchedName={name} />
            </Layout>
        </Layout>
    );
};

export default App;
