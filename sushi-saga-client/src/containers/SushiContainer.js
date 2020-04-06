import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  const renderSushi = () => {
    return props.sushis.slice(props.startIndex, (props.startIndex + 4)).map(piece=> {
      return <Sushi 
          key={piece.id} 
          name={piece.name} 
          url={piece.img_url} 
          price={piece.price} 
          eaten={piece.eaten}
          clickHandle={() => props.eaten(piece)}
          />
    })
  }

  return (
    <Fragment>
      <div className="belt">
        {
          renderSushi()
        }
        <MoreButton nextPage = {props.nextPage}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer