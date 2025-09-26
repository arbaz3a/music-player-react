import React, { useState, useRef } from "react";
import { ContextFunction } from "../context/context";
import Sidebar from "./Sidebar";
import MainImageSection from "./MainImageSection";
import RightSidebar from "./RightSidebar";

function Layout() {
  const [index, setindex] = useState(0);
  const songref = useRef(null);
  const [isplaying, setisplaying] = useState(false);

  //toggle play pause button
  const toggleplaybtn = () => {
    // play pause action
    if (isplaying) {
      songref.current.pause();
    } else {
      songref.current.play();
    }
    setisplaying(!isplaying);
  };


  return (
    <>
      <ContextFunction.Provider value={{isplaying, setisplaying, index, setindex, songref, toggleplaybtn}}>
        <div className="flex w-full h-auto">
          {/* left sidebar */}
          <Sidebar />

          {/* hero section */}
          <div className="flex-1 px-4">
            <MainImageSection/>
          </div>

          {/* right sidebar */}
          <div className="w-[20%]">
            <RightSidebar/>
          </div>
        </div>
      </ContextFunction.Provider>
    </>
  );
}

export default Layout;
