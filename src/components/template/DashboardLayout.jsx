import React from "react";
import { HeaderDashboard } from "../HeaderDashboard";
import { Footer } from "../Footer";

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-full default-layout">
      <div className="relative z-20">
        <HeaderDashboard />
        <main className="max-w-7xl w-full mx-auto py-10 lg:py-16 px-4 lg:px-10">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};