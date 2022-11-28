import React from "react";

const CloseIcon = ({ event }) => (
  <div className="hamburger ">
    <div onClick={event}>
      <div className="hamburger-inner right-3 top-7"></div>
    </div>
  </div>
);

export default CloseIcon;
