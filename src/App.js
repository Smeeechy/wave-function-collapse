import React from 'react'
import styles from './App.module.css'
import Grid from './components/Grid'

const rows = 10
const cols = 2 * rows

const handleAutoComplete = () => {
  console.log('autocompleting')
}

const App = () => {
  return (
    <div className={styles.container}>
      <Grid rows={rows} cols={cols} />
      <div className={styles.buttons}>
        {/*TODO: make these buttons work*/}
        <button className={`${styles.button} ${styles.complete}`} onClick={handleAutoComplete}>Auto-Complete</button>
        <button className={`${styles.button} ${styles.reset}`} onClick={() => {}}>Reset</button>
      </div>
    </div>
  )
}

export default App
