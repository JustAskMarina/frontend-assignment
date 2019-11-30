import React, { useState } from 'react';
import { Layout, Pagination } from 'antd';
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
                {/*
                <Pagination
                    /*showSizeChanger onShowSizeChange={}* defaultCurrent={1}
                    total={5}
                    style={{ margin: '16px auto' }}
                />*/}
                <ContentComponent currentType={type} />
                {/*
                <Pagination
                    /*showSizeChanger onShowSizeChange={}* defaultCurrent={1}
                    total={5}
                    style={{ margin: '16px auto' }}
                />*/}
            </Layout>
        </Layout>
    );
};

export default App;
