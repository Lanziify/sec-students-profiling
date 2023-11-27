import React from 'react'

const Input = (props) => {
  return (
    <div>
      <input type={props.type || 'text'} />
    </div>
  )
}

export default Input
