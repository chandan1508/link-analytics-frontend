import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    // <div
    //   className={`min-h-screen bg-gray-100 ${
    //     sidebarOpen ? "fixed w-full" : ""
    //   }`}
    // >
    //   <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    //   <div className="flex">
    //     <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    //     <main className="flex-1 md:max-w-[calc(100vw-16rem)]">
    //       <Outlet />
    //     </main>
    //   </div>

    //   <Footer />
    // </div>

    <div
      className={`flex flex-col min-h-screen bg-gray-100 ${
        sidebarOpen ? "fixed w-full" : ""
      }`}
    >
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 md:max-w-[calc(100vw-16rem)] p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
