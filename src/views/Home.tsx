import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <Link to="/login">Go to Login Page</Link>
            </div>
            <div>
                <Link to="/xd">Go to Error Page</Link>
            </div>
        </div>
    );
}

export default Home;
