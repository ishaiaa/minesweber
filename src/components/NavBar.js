import React from 'react';

import styles from './NavBar.module.css'

function NavBar(props) {
    return (
        <div className={styles.mainContainer}>
            <p><span>Mines</span><span className={styles.red}>WEB</span><span>er</span></p>
            
        </div>
    );
}

export default NavBar;