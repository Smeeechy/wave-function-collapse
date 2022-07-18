import { useState } from 'react'
import styles from './Grid.module.css'
import Tile from './Tile'

const Grid = ({rows, cols}) => {
  const tileCount = rows * cols
  const orientations = {
    up: require('../assets/up.png'),
    down: require('../assets/down.png'),
    left: require('../assets/left.png'),
    right: require('../assets/right.png'),
    horizontal: require('../assets/horizontal.png'),
    vertical: require('../assets/vertical.png'),
    blank: require('../assets/blank.png'),
    none: require('../assets/none.png')
  }

  const [tiles, setTiles] = useState(new Array(tileCount).fill('none'))

  const collapseHandler = (index, state) => {
    let newTiles = [...tiles]
    newTiles[index] = state
    setTiles(newTiles)
  }

  const getNeighbors = index => {
    const top = tiles[index - cols] ? tiles[index - cols] : null
    const right = tiles[index + 1] ? tiles[index + 1] : null
    const bottom = tiles[index + cols] ? tiles[index + cols] : null
    const left = tiles[index - 1] ? tiles[index - 1] : null
    return { top, right, bottom, left }
  }

  return (
    <div className={styles.container}>
      {tiles.map((_, index) => (
        <Tile
          key={index}
          index={index}
          size={(window.innerWidth - 20) / cols}
          onCollapse={collapseHandler}
          getNeighbors={getNeighbors}
          orientations={orientations}
        />
      ))}
    </div>
  )
}

export default Grid
