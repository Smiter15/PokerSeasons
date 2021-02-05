import React from 'react';

import '../css/layout.css';

import Nav from './Nav';

const Layout = ({ children, mainClass }) => {
    return (
        <>
            <Nav />
            <main className={mainClass} style={{ marginTop: '2rem' }}>
                {children}
            </main>
        </>
    );
};

export default Layout;
