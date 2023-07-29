import { useEffect, useState } from 'react'
import styles from './Tile.module.css'

const Tile = ({ getNeighbors, index, orientations, size, onCollapse }) => {
  const [orientation, setOrientation] = useState(orientations.none)
  const [collapseOptions, setCollapseOptions] = useState(
    [...Object.keys(orientations)].filter(key => key !== 'none')
  )

  useEffect(() => {
    const neighbors = getNeighbors(index)
    let valid = [...Object.keys(orientations)].filter(key => key !== 'none')
    for (const neighbor in neighbors) {
      if (neighbor === null) continue
      switch (neighbor) {
        case 'top':
          switch (neighbors[neighbor]) {
            case 'up':
            case 'horizontal':
            case 'blank':
              valid = valid.filter(
                dir =>
                  dir !== 'up' &&
                  dir !== 'right' &&
                  dir !== 'left' &&
                  dir !== 'vertical'
              )
              break
            case 'right':
            case 'down':
            case 'left':
            case 'vertical':
              valid = valid.filter(
                dir => dir !== 'down' && dir !== 'horizontal' && dir !== 'blank'
              )
              break
            default:
              break
          }
          break
        case 'right':
          switch (neighbors[neighbor]) {
            case 'right':
            case 'vertical':
            case 'blank':
              valid = valid.filter(
                dir =>
                  dir !== 'up' &&
                  dir !== 'right' &&
                  dir !== 'down' &&
                  dir !== 'horizontal'
              )
              break
            case 'up':
            case 'down':
            case 'left':
            case 'horizontal':
              valid = valid.filter(
                dir => dir !== 'left' && dir !== 'vertical' && dir !== 'blank'
              )
              break
            default:
              break
          }
          break
        case 'bottom':
          switch (neighbors[neighbor]) {
            case 'down':
            case 'horizontal':
            case 'blank':
              valid = valid.filter(
                dir =>
                  dir !== 'right' &&
                  dir !== 'down' &&
                  dir !== 'left' &&
                  dir !== 'vertical'
              )
              break
            case 'up':
            case 'right':
            case 'left':
            case 'vertical':
              valid = valid.filter(
                dir => dir !== 'up' && dir !== 'horizontal' && dir !== 'blank'
              )
              break
            default:
              break
          }
          break
        case 'left':
          switch (neighbors[neighbor]) {
            case 'left':
            case 'vertical':
            case 'blank':
              valid = valid.filter(
                dir =>
                  dir !== 'up' &&
                  dir !== 'down' &&
                  dir !== 'left' &&
                  dir !== 'horizontal'
              )
              break
            case 'up':
            case 'right':
            case 'down':
            case 'horizontal':
              valid = valid.filter(
                dir => dir !== 'right' && dir !== 'vertical' && dir !== 'blank'
              )
              break
            default:
              break
          }
          break
        default:
          break
      }
    }
    setCollapseOptions(valid)
  }, [orientations, getNeighbors, index])

  const collapse = () => {
    const choice =
      collapseOptions[Math.floor(Math.random() * collapseOptions.length)]
    onCollapse(index, choice)
    setOrientation(orientations[choice])
  }

  const clickHandler = () => {
    if (orientation === orientations.none) {
      collapse()
    }
  }

  const containerSizingStyle = {
    width: size,
    height: size
  }

  const maxOptions = Object.keys(orientations).length - 1
  const currentOptions = collapseOptions.length
  const opacity = (maxOptions - currentOptions) / maxOptions

  const uncollapsedImage = (
    <div
      className={styles.uncollapsed}
      style={{
        opacity
      }}
    >
      <div className={styles.uncollapsedText}>{collapseOptions.length}</div>
    </div>
  )

  const collapsedImage = (
    <img alt='a tile' src={orientation} className={styles.image} />
  )

  return (
    <div
      className={styles.container}
      style={containerSizingStyle}
      onClick={clickHandler}
    >
      {orientation === orientations.none ? uncollapsedImage : collapsedImage}
    </div>
  )
}

export default Tile
