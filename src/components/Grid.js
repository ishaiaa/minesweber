import React from 'react';

import styles from './Grid.module.css'
import Cell from './Cell';


function Grid(props) {
    return (
        <div style={{'--gridSize': props.gridSize}} className={styles.mainContainer}>
            {
                Array.apply(null, Array(props.gridSize * props.gridSize)).map(() => {
                    return <Cell />
                })
            }
        </div>
    );
}

export default Grid;