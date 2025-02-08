import React, { createContext, useContext } from "react";
import { useAppSelector } from "../redux"; // Redux 的状态选择器

// 定义上下文类型
interface DarkModeContextType {
  isDarkMode: boolean;
}

// 创建上下文
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// 提供者组件
export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 自定义 Hook，用于访问 Context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
