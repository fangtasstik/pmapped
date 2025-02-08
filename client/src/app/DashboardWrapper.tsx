"use client"

import React, { useEffect } from "react"
import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar"
import StoreProvider, { useAppSelector } from "./redux"
// import { DarkModeProvider } from "./context/DarkModeContext" // 使用context在父子间传递值

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* SideBar */}
      <SideBar />
      <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${isSidebarCollapsed ? "" : "pl-64"}`}>
        {/* NavBar */}
        <div className="sticky top-0">
          <NavBar />
        </div>
        <div className="scrollable-content">
          {children}
        </div>
      </main>
    </div>
  )
}

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {/* <DarkModeProvider> */}
        <DashboardLayout>{children}</DashboardLayout>
      {/* </DarkModeProvider> */}
    </StoreProvider>
  )
}

export default DashboardWrapper