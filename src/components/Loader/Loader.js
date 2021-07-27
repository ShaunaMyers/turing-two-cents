import React from 'react';
import './Loader.css';

const Loader = ({ error }) => {
    return (
        <section className="loader">
            <p>{error}</p>
        </section>
    )
}

export default Loader;