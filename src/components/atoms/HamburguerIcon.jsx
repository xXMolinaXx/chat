import React from 'react'

const HamburguerIcon = ({event}) => (
    <div className="hamburger ">
        <div
          onClick={event}
        >
          <div className="x-inner right-3 top-10"></div>
        </div>
      </div>
  )

export default HamburguerIcon