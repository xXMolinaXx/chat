import React from 'react'

const HamburguerIcon = ({event}) => (
    <div className="hamburger ">
        <a
          href="#"
          onClick={event}
        >
          <div className="x-inner right-3 top-10"></div>
        </a>
      </div>
  )

export default HamburguerIcon