import React from 'react'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar =() => {
    return (
        <div>
            <nav class="nav-wrapper darken-3">
                <div class="container">
                <a href="#" class="brand-logo">Adventures in BigCity</a>
                    <SignedInLinks/>
                    <SignedOutLinks/>
                </div>
            </nav>
        </div>
    )
}

export default Navbar ;