import React from 'react';

import styles from './Grid.module.css'
import Cell from './Cell';
import GameManager from '../game/GameManager';

function Grid(props) {

    function handleCellClick(id) {
        props.cellClick(id);
    }

    function handleCellFlag(id) {
        props.cellFlag(id)
    }

    return (
        <div style={{'--gridSize': props.gridSize}} className={styles.mainContainer}>
            {
                props.gridData.map((test) => {
                    const list = test.map((object) => {
                        let id = object.id
                        let size = props.gridSize
                        let row = Math.floor(id/size);
                        let col = id%size

                        return (
                            
                            <Cell    
                                reference={props.gridData[row][col]}
                                click={handleCellClick}
                                flag={handleCellFlag}
                            />
                        )
                    })

                    return list;
                })
            }
        </div>
    );
}

export default Grid;