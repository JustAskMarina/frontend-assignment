import React from 'react';
import { Layout, Pagination } from 'antd';
import SiderComponent from './components/Sider';
import HeaderComponent from './components/Header';
import ContentComponent from './components/Content';

export default function App() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderComponent />
            <Layout style={{ backgroundColor: '#F0F2F5' }}>
                <HeaderComponent />
                <Pagination
                    /*showSizeChanger onShowSizeChange={}*/ defaultCurrent={1}
                    total={5}
                    style={{ margin: '16px auto' }}
                />
                <ContentComponent />
                <Pagination
                    /*showSizeChanger onShowSizeChange={}*/ defaultCurrent={1}
                    total={5}
                    style={{ margin: '16px auto' }}
                />
            </Layout>
        </Layout>
    );
}
