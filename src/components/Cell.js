import React, { useEffect } from 'react';

import styles from './Cell.module.css'
import mine from '../images/mine.png'
import flag from '../images/flag.png'

function Cell(props) {

    function handleClick() {
        console.log("click")
        props.click(props.reference.id)
    }

    function handleFlag(event) {
        event.preventDefault();
        props.flag(props.reference.id);
    }

    var content;


    if(props.reference.isFlagged) {
        content = <img className={styles.flag} src={flag} alt="flag"></img>
    }
    else if(props.reference.isBomb) {
        content = <img src={mine} alt="mine"></img>
    }
    else if(props.reference.value > 0) {
        let ratio = props.reference.value/8;
        let red = 255*ratio;
        let green = 255-red*2;
        
        content = <p style={{
           color: `rgb(${red}, ${green}, 0)`
        }}>{props.reference.value}</p>
    }
    return (
        <div 
            onClick={handleClick}
            onContextMenu={handleFlag}
            className={`${styles.mainContainer} ${!props.reference.isRevealed && styles.hidden}`}
        >
            {content}
        </div>
    );
}

export default Cell;