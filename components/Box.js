import React from "react";

const Box = ({ address, message, time }) => {
  return (
    <div className="p-6 mt-6 text-left border bg-transparent border-blue-500 w-80 sm:w-96 rounded-xl shadow-xl">
      <h3 className="truncate text-xl font-bold  hover:text-blue-400 text-blue-600">
        <a href={`https://etherscan.io/address/${address}/`} target="_blank">
          {address}
        </a>
      </h3>
      <p className="overflow-ellipsis mt-2 text-lg text-white">{message}</p>
      <p className="mt-1 text-md text-gray-800">{time}</p>
    </div>
  );
};

export default Box;
