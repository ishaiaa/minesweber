import Grid from "./components/Grid";

import styles from './App.module.css'
import { useEffect, useState } from "react";
import CellData from "./game/CellData";
import GameManager from "./game/GameManager";


function App(props) {


  const [gridSize, setGridSize]   = useState(12);
  const [bombCount, setBombCount] = useState(20)
  const [playGrid, setPlayGrid]   = useState([]);

  function cellClick(id) {
    setPlayGrid(prevState => {
      let size = prevState.length;
      let row = Math.floor(id/size);
      let col = id%size;

      return [...GameManager.recurcsiveReveal(row, col, prevState)]
    })
  }

  function cellFlag(id) {
    setPlayGrid(prevState => {
      return [...GameManager.flagCell(id, prevState)]
    })
  }

  useEffect(() => {
    let generatedGrid = GameManager.generateGameGrid(gridSize, ((bombCount < (gridSize*gridSize)) ? bombCount : (gridSize * gridSize)-3))

    setPlayGrid(generatedGrid);  
  }, [])

  return (
    <div className={styles.mainContainer}>
      <Grid 
        gridSize={gridSize} 
        gridData={playGrid} 
        cellClick={cellClick}
        cellFlag={cellFlag}
      />
    </div>
  );
}

export default App;