import React from 'react'
import LoadingGif from '../images/loading.gif'

const Loader = () => {
  return (
    <div>Loader
        <div className='loader__image'>
            <img src={LoadingGif} alt=""/>
        </div>

    </div>
  )
}

export default Loader