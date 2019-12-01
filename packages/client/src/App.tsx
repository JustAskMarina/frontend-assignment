import React, { useState } from 'react';
import { Layout } from 'antd';
import SiderComponent from './components/Sider';
import HeaderComponent from './components/Header';
import ContentComponent from './components/Content';

const App: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [limit, setLimit] = useState<number>(10);

    const filterByType = (clicked: any) => {
        let type = clicked.item.props.children.props.children;
        type === 'All' ? setType('') : setType(type);
        setLimit(10);
    };

    const filterByName = (searched: string) => {
        setName(searched);
        setLimit(10);
    };

    const loadMore = () => {
        setLimit(limit + 10);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderComponent currentType={type} filterByName={filterByName} filterByType={filterByType} />
            <Layout style={{ backgroundColor: '#F0F2F5' }}>
                <HeaderComponent />
                <ContentComponent currentType={type} searchedName={name} limit={limit} setLimit={loadMore} />
            </Layout>
        </Layout>
    );
};

export default App;
