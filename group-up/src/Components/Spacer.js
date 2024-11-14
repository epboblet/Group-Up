import React from 'react'

export const Spacer = ({height, width, unit}) => {
  return (
    <div style={{height: height + unit, width: width + unit}}></div>
  )
}
