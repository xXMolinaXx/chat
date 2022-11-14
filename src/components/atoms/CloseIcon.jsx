import React from 'react'

const CloseIcon = ({ event }) => (
    <div className="hamburger ">
        <a
            href="#"
            onClick={event}
        >
            <div className="hamburger-inner right-3 top-7"></div>
        </a>
    </div>
)


export default CloseIcon