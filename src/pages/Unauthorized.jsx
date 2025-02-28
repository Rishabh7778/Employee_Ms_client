import React from 'react'
import Unauthorized from '../assets/unauthorized.webp';

const Unauthor = () => {
  return (
    <div>
      <img src={Unauthorized} height={80} width={80} className='mx-auto' alt="Error image" />
    </div>
  )
}

export default Unauthor;
