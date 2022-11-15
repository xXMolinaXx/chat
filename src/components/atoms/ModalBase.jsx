import React from "react";

const ModalBase = ({ children, titulo, onclose }) => {
  return (
    <div className="absolute h-full w-screen bg-regal-blue centerHorizontalVertical my-container">
      <div className="bg-white w-3/6 h-3/6 rounded-xl p-5">
        <div className="border-b-4 flex py-2">
          <div className="w-3/6">
            <h1>{titulo}</h1>
          </div>
          <div className="w-full flex justify-end">
            <div onClick={onclose} className="hover:text-xl">
              X
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
