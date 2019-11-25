import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export default function ContentComponent() {
    return (
        <Content
            style={{
                margin: '0 16px',
                padding: 24,
                background: '#fff'
            }}
        >
            Content
        </Content>
    );
}
