import styles from './App.module.css'
import Grid from './components/Grid'

const rows = 50
const cols = 2 * rows

const App = () => {
  return (
    <div className={styles.container}>
      <Grid rows={rows} cols={cols} />
      <div className={styles.buttons}>
        {/*TODO: make these buttons work*/}
        <button>Auto-Complete</button>
        <button>Reset</button>
      </div>
    </div>
  )
}

export default App
