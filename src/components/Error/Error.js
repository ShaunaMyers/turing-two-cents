import React from 'react';
import './Error.css'

const Error = ({ error }) => {
    return (
        <section className="error">
            <p>{error}</p>
        </section>
    )
}

export default Error;