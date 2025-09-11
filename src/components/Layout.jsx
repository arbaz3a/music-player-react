import React from "react";
import Sidebar from "./Sidebar";
import MainImageSection from "./MainImageSection";
import RightSidebar from "./RightSidebar";

function Layout() {
  return (
    <div className="flex w-full">
      {/* left sidebar */}
      <Sidebar />

      {/* hero section */}
      <div className="flex-1 px-4">
        <MainImageSection />
      </div>

      {/* right sidebar */}
      <div className="w-[20%]">
        <RightSidebar />
      </div>
    </div>
  );
}

export default Layout;
