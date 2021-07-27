import React from 'react';
import './Loader.css';

const Loader = ({ loading }) => {
    return (
        <section className="loader">
            <p>{loading}</p>
        </section>
    )
}

export default Loader;