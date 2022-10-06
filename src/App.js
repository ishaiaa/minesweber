import Grid from "./components/Grid";

import styles from './App.module.css'
import { useEffect, useState } from "react";
import GameManager from "./game/GameManager";
import NavBar from "./components/NavBar";
import GridConfig from "./components/GridConfig";

function App(props) {


  const [gridSize, setGridSize]   = useState(10);
  const [bombCount, setBombCount] = useState(10)
  const [playGrid, setPlayGrid]   = useState([]);
  const [gameRunning, setGameRunning] = useState(true);
  const [gameRestart, setGameRestart] = useState(0);

 

  function cellClick(id) {
    
    if(gameRunning) setPlayGrid(prevState => {
      let size = prevState.length;
      let row = Math.floor(id/size);
      let col = id%size;

      if(playGrid[row][col].isBomb && !playGrid[row][col].isFlagged) {
        toggleGameState(false);
      }

      return [...GameManager.recurcsiveReveal(row, col, prevState)]
    })
  }

  function toggleGameState(state) {
    setGameRunning(state);
  }

  function cellFlag(id) {
    setPlayGrid(prevState => {
      return [...GameManager.flagCell(id, prevState)]
    })
  }

  useEffect(() => {
    let generatedGrid = GameManager.generateGameGrid(gridSize, ((bombCount < (gridSize*gridSize)) ? bombCount : (gridSize * gridSize)-3))

    setPlayGrid(generatedGrid)
    setGameRunning(true)

  }, [gridSize, bombCount, gameRestart])

  function handleGridResize(n) {
    setGridSize(n);
  }

  function handleBombChange(n) {
    setBombCount(n);
  }

  function handleRestart() {
    setGameRestart(prevState => prevState+1)
  }

  return (
    <>
      <NavBar /> 
      <div className={styles.mainContainer}>
        <GridConfig
          size={gridSize}
          bombs={bombCount}
          sizeSetter={handleGridResize}
          bombSetter={handleBombChange}
          restarter={handleRestart}   
        />
        <Grid 
          gridData={playGrid} 
          cellClick={cellClick}
          cellFlag={cellFlag}
          gameRunning={gameRunning}
        />
      </div>
    </>
    
  );
}

export default App;