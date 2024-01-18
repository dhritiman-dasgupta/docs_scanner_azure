import React from "react";

import "./navbar.css";

function Navbar() {
    return (
        <div className='navbar'>
            <h2>Portable Docs Scanner</h2>
            <img src='https://aeonixinnovations.com/wp-content/uploads/2021/12/logow3.png' height={"60px"} />
            <div className="links-container">
                <div className="link">About</div>
                <div className="link">Contributers</div>
                <button className="visit-btn">Visit Website</button>
            </div>
        </div>
    );
}
export default Navbar;
