import React from "react";

const BackDrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-[#000000a9]">
      {children}
    </div>
  );
};

export default BackDrop;
