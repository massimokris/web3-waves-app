import React from "react";

const Box = () => {
  return (
    <div className="p-6 mt-6 text-left border bg-transparent border-blue-500 w-80 sm:w-96 rounded-xl shadow-xl">
      <h3 className="truncate text-xl font-bold  hover:text-blue-500 focus:text-blue-600">
        0xDd1Ad9A21Ce722C151A836373baBe42c868cE9a4
      </h3>
      <p className="overflow-ellipsis mt-2 text-lg">
        Hey Massimo, how are you doing! Hey Massimo, how are you doing! Hey
        Massimo, how are you doing!
      </p>
      <p className="mt-1 text-md text-gray-800">Oct 2, 2021</p>
    </div>
  );
};

export default Box;
