import Grid from "./components/Grid";

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.mainContainer}>
      <Grid gridSize={3} />
    </div>
  );
}

export default App;