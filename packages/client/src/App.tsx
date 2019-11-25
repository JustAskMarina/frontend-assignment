import React from 'react';
import { Layout } from 'antd';
import SiderComponent from './components/Sider';
import HeaderComponent from './components/Header';

export default function App() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderComponent />
            <Layout style={{ backgroundColor: '#F0F2F5' }}>
                <HeaderComponent />
            </Layout>
        </Layout>
    );
}
