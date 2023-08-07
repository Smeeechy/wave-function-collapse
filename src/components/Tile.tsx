import { useCallback, useEffect, useState } from 'react'
import styles from './Tile.module.css'
import { NeighborStatesType, OrientationsType } from './Grid'

type TileProps = {
  getNeighborStates: (index: number) => NeighborStatesType,
  index: number,
  orientations: OrientationsType,
  size: number,
  onCollapse: (index: number, choice: string) => void
}

const intersect = (a: Set<string>, b: Set<string>): Set<string> => {
  const result = new Set<string>()
  a.forEach((entry: string) => { if(b.has(entry)) result.add(entry) })
  return result
}

const Tile = ({ getNeighborStates, index, orientations, size, onCollapse }: TileProps) => {
  const getOrientationsArray = useCallback((): string[] => [...Object.keys(orientations)], [orientations])
  const [orientation, setOrientation] = useState(orientations.none)
  const [collapseOptions, setCollapseOptions] = useState(getOrientationsArray().filter(key => key !== 'none'))

  const collapse = () => {
    const choice = collapseOptions[Math.floor(Math.random() * collapseOptions.length)]
    onCollapse(index, choice)
    setOrientation(orientations[choice])
  }

  useEffect(() => {
    let valid = new Set(getOrientationsArray().filter(key => key !== 'none'))

    // filters out options that are empty in the given direction
    const optionsWithSolid = (direction: string): Set<string> => {
      const filtered = getOrientationsArray().filter((option: string) => option.includes(direction))
      return new Set(filtered)
    }

    // filters out options that are solid in the given direction
    const optionsWithEmpty = (direction: string): Set<string> => {
      const filtered = getOrientationsArray().filter((option: string) => !option.includes(direction))
      return new Set(filtered)
    }

    // sets containing various tile options for filtering
    const solidUp = optionsWithSolid('up')
    const solidLeft = optionsWithSolid('left')
    const solidRight = optionsWithSolid('right')
    const solidDown = optionsWithSolid('down')
    const emptyUp = optionsWithEmpty('up')
    const emptyLeft = optionsWithEmpty('left')
    const emptyRight = optionsWithEmpty('right')
    const emptyDown = optionsWithEmpty('down')

    // reduce valid options to only those congruent with the current state of its neighbors
    const neighborStates = getNeighborStates(index)
    for (const neighbor in neighborStates) {
      if (neighbor === null) continue
      let neighborState: string | null;

      switch (neighbor) {
        case 'up':
          neighborState = neighborStates[neighbor]
          if (!neighborState || neighborState === 'none') break
          if (neighborState.includes('down')) valid = intersect(solidUp, valid)
          else valid = intersect(emptyUp, valid)
          break

        case 'right':
          neighborState = neighborStates[neighbor]
          if (!neighborState || neighborState === 'none') break
          if (neighborState.includes('left')) valid = intersect(solidRight, valid)
          else valid = intersect(emptyRight, valid)
          break

        case 'down':
          neighborState = neighborStates[neighbor]
          if (!neighborState || neighborState === 'none') break
          if (neighborState.includes('up')) valid = intersect(solidDown, valid)
          else valid = intersect(emptyDown, valid)
          break

        case 'left':
          neighborState = neighborStates[neighbor]
          if (!neighborState || neighborState === 'none') break
          if (neighborState.includes('right')) valid = intersect(solidLeft, valid)
          else valid = intersect(emptyLeft, valid)
          break

        default:
          break
      }
    }

    setCollapseOptions([...valid])
  }, [getOrientationsArray, getNeighborStates, index])

  const clickHandler = () => orientation === orientations.none && collapse()

  // completely transparent when all choices available, becomes more opaque the fewer options are left for the tile
  const opacity = 1 / collapseOptions.length - 1 / (Object.keys(orientations).length - 1)

  const uncollapsedImage = 
    <div className={styles.uncollapsed} style={{ opacity }}>
      <div className={styles.uncollapsedText}>{collapseOptions.length}</div>
    </div>

  const collapsedImage = <img alt='a tile' src={orientation as string} className={styles.image} />

  return (
    <div className={styles.container} style={{ width: size, height: size }} onClick={clickHandler}>
      {orientation === orientations.none ? uncollapsedImage : collapsedImage}
    </div>
  )
}

export default Tile
