import React from 'react';

import styles from './Grid.module.css'
import Cell from './Cell';
import GameManager from '../game/GameManager';

function Grid(props) {

    const gridSize = props.gridData.length;

    function handleCellClick(id) {
        props.cellClick(id);
    }

    function handleCellFlag(id) {
        props.cellFlag(id)
    }

    return (
        <div 
            style={{'--gridSize': gridSize}} 
            className={`${styles.mainContainer} ${props.gameRunning ? "" : styles.gameOver}`}>
            {
                props.gridData.map((test) => {
                    const list = test.map((object) => {
                        let id = object.id
                        let size = gridSize
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