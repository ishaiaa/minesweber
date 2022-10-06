import React from 'react';

import styles from './GridConfig.module.css'
import NumericInput from 'react-numeric-input'

function GridConfig(props) {

    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.gameInfo}>
                
            </div>
            <div className={styles.gameSetup}>
                <div className={styles.inline}>
                    <p>Size</p>
                    <NumericInput 
                        className="form-control" 
                        value={props.size} 
                        min={2} 
                        max={20} 
                        step={1} 
                        mobile
                        onChange={(e)=>props.sizeSetter(e)}
                    />
                </div>
                <div className={styles.inline}>
                    <p>Bombs</p>
                    <NumericInput 
                        className="form-control" 
                        value={props.bombs} 
                        min={2} 
                        max={40} 
                        step={1} 
                        mobile
                        onChange={(e)=>props.bombSetter(e)}
                    />
                </div>
                <button onClick={props.restarter}>Restart</button>
            </div>
        </div>
    );
}

export default GridConfig;