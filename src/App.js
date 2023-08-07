import React, { useState } from 'react'
import styles from './App.module.css'
import Grid from './components/Grid.tsx'

const rows = 25
const cols = 2 * rows

const App = () => {
  const [grid, setGrid] = useState(<Grid key={Date.now()} rows={rows} cols={cols}/>)

  const handleAutoComplete = () => {}

  const handleReset = () => setGrid(<Grid key={Date.now()} rows={rows} cols={cols}/>)

  return (
    <div className={styles.container}>
      {grid}
      <div className={styles.buttons}>
        {/*TODO: make autocomplete work*/}
        <button className={`${styles.button} ${styles.complete}`} onClick={handleAutoComplete}>Auto-Complete</button>
        <button className={`${styles.button} ${styles.reset}`} onClick={handleReset} rows={rows} cols={cols}>Reset</button>
      </div>
    </div>
  )
}

export default App
