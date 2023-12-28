"use client";

import { Header } from "../Header";
import { Footer } from "../Footer";
import { usePathname } from "next/navigation";
import { Intro } from "../landing/Intro";

export const DefaultLayout = ({ children }) => {
  const currentPath = usePathname();
  const landingPage = currentPath === "/";

  if (
    currentPath === "/login" ||
    currentPath === "/register" ||
    currentPath === "/userProfile" ||
    currentPath.startsWith("/dashboard")
  ) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col justify-between h-full default-layout">
      <div className="relative z-20">
        <Header />
        {landingPage ? <Intro /> : null}
        <main className="max-w-7xl w-full mx-auto py-5 lg:py-10 px-4 lg:px-10">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
