import React from 'react';
import HeaderForm from './Form';

import './Headerstyle.css'

class Header extends React.Component {

    render() {
        return (
        <div className="dropdown">
            <div className="dropbtn">
                <i>Hi There </i><i className="fa fa-caret-down"></i>
            </div>
            <div className="dropdown-content">
                <HeaderForm />
            </div>
        </div>
        );
    }
}

export default Header;