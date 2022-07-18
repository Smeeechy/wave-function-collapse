import { useState } from 'react'
import styles from './Tile.module.css'

const Tile = props => {
  const [orientation, setOrientation] = useState(props.orientations.none)

  const collapse = () => {
    const neighbors = props.getNeighbors(props.index)
    const valid = getValidOrientations(neighbors, props.orientations)
    const choice = valid[Math.floor(Math.random() * valid.length)]
    props.onCollapse(props.index, choice)
    setOrientation(props.orientations[choice])
  }

  const handleCollapse = () => {
    if (orientation === props.orientations.none) {
      collapse()
    }
  }

  const getValidOrientations = (neighbors, orientations) => {
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
    return valid
  }

  const style = {
    width: props.size,
    height: props.size
  }

  return (
    <div style={style} onClick={handleCollapse} >
      <img alt='a tile' src={orientation} className={styles.image} />
    </div>
  )
}

export default Tile
