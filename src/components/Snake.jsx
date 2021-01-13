import React from 'react'

const Snake = ({ snakeDots }) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        }
        return (
          <div className='snake-dot' style={style} key={i}></div>
        )
      })}
    </div>
  )
}

export default Snake
