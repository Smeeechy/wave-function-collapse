import React, { useState } from 'react'
import styles from './Grid.module.css'
import Tile from './Tile'

type GridProps = {
  rows: number,
  cols: number
};

export type NeighborStatesType = {
  up: string | null,
  left: string | null,
  right: string | null,
  down: string | null
}

const orientations = {
  // empty tiles
  none: require('../assets/none.png'),
  blank: require('../assets/blank.png'),

  // stubs
  up: require('../assets/up.png'),
  left: require('../assets/left.png'),
  right: require('../assets/right.png'),
  down: require('../assets/down.png'),

  // corners
  upleft: require('../assets/up-left.png'),
  leftdown: require('../assets/left-down.png'),
  upright: require('../assets/up-right.png'),
  rightdown: require('../assets/right-down.png'),

  // t-blocks
  upleftright: require('../assets/up-left-right.png'),
  upleftdown: require('../assets/up-left-down.png'),
  uprightdown: require('../assets/up-right-down.png'),
  leftrightdown: require('../assets/left-right-down.png'),

  // cross, vertical bar, and horizontal bar
  upleftrightdown: require('../assets/up-left-right-down.png'),
  updown: require('../assets/up-down.png'),
  leftright: require('../assets/left-right.png')
}

export type OrientationsType = typeof orientations;

const Grid = ({ rows, cols }: GridProps) => {
  const tileCount = rows * cols
  const [tiles, setTiles]: [string[], Function] = useState(new Array(tileCount).fill('none'))

  const collapseHandler = (index: number, state: string): void => {
    let newTiles = [...tiles]
    newTiles[index] = state
    setTiles(newTiles)
  }

  const getNeighborStates = (index: number): NeighborStatesType => {
    const up = tiles[index - cols] ? tiles[index - cols] : null
    const left = (index - 1) % cols === cols - 1 ? null : tiles[index - 1]
    const right = (index + 1) % cols === 0 ? null : tiles[index + 1]
    const down = tiles[index + cols] ? tiles[index + cols] : null
    return { up, left, right, down }
  }

  return (
    <div className={styles.container}>
      {tiles.map((_, index) => 
        <Tile
          key={index}
          index={index}
          size={(window.innerWidth - 20) / cols}
          onCollapse={collapseHandler}
          getNeighborStates={getNeighborStates}
          orientations={orientations} />
      )}
    </div>
  )
}

export default Grid
