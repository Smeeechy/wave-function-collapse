import React, { useCallback, useEffect, useState } from 'react'
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

  const collapse = useCallback(() => {
    const choice = collapseOptions[Math.floor(Math.random() * collapseOptions.length)]
    onCollapse(index, choice)
    setOrientation(orientations[choice])
  }, [collapseOptions, index, onCollapse, orientations])

  useEffect(() => {
    const neighborStates = getNeighborStates(index)
    let valid = new Set(getOrientationsArray().filter(key => key !== 'none'))

    // sets containing various tile options for filtering
    const solidUp = new Set(getOrientationsArray().filter((option: string) => option.includes('up')) as string[])
    const solidLeft = new Set(getOrientationsArray().filter((option: string) => option.includes('left')) as string[])
    const solidRight = new Set(getOrientationsArray().filter((option: string) => option.includes('right')) as string[])
    const solidDown = new Set(getOrientationsArray().filter((option: string) => option.includes('down')) as string[])
    const emptyUp = new Set(getOrientationsArray().filter((option: string) => !option.includes('up')) as string[])
    const emptyLeft = new Set(getOrientationsArray().filter((option: string) => !option.includes('left')) as string[])
    const emptyRight = new Set(getOrientationsArray().filter((option: string) => !option.includes('right')) as string[])
    const emptyDown = new Set(getOrientationsArray().filter((option: string) => !option.includes('down')) as string[])
    
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
  }, [collapse, orientation, orientations, getNeighborStates, index, getOrientationsArray])

  const clickHandler = () => orientation === orientations.none && collapse()

  const containerSizingStyle = { width: size, height: size }
  const maxOptions = Object.keys(orientations).length - 1
  const currentOptions = collapseOptions.length
  // completely transparent when all choices available, becomes more opaque the fewer options are left for the tile
  const opacity = 1 / currentOptions - 1 / maxOptions

  const uncollapsedImage = 
    <div className={styles.uncollapsed} style={{opacity}}>
      <div className={styles.uncollapsedText}>{collapseOptions.length}</div>
    </div>

  const collapsedImage = <img alt='a tile' src={orientation} className={styles.image} />

  return (
    <div className={styles.container} style={containerSizingStyle} onClick={clickHandler}>
      {orientation === orientations.none ? uncollapsedImage : collapsedImage}
    </div>
  )
}

export default Tile
