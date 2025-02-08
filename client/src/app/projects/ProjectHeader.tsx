import Header from '@/components/Header';
import { Clock, Filter, PlusSquare, Share2, Table } from 'lucide-react';
import { List } from 'lucide-react';
import { Grid3x3 } from 'lucide-react';
import React, { useState } from "react"
import ModalNewProject from '../../components/ModalNewProject';
// import { useDarkMode } from '../context/DarkModeContext';

type Props = {
  activeTab: string,
  setActiveTab: (tabName: string) => void
}

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      {/* Modal New Project */}
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name="Product Design Development"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" /> New Boards
            </button>
          }
        />
      </div>

      {/* Tabs */}
      {/* 使用flex-wrap-reverse在md尺寸时,逆序wrap两个div元素,也可以用order-[0-12,first,last,none,(可扩展)]来实现自定义排序 */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-1 dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>

    </div >
  )
}

type TabButtonProps = {
  name: string
  icon: React.ReactNode
  setActiveTab: (tabName: string) => void
  activeTab: string
}

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;
  // const {isDarkMode} = useDarkMode();

  // 提取复用逻辑到外部函数
  function getHighlightClass(isActive: boolean): string {
    return isActive
      ? "text-blue-600 after:bg-blue-600 dark:text-white dark:after:bg-white"
      : "";
  }

  return (
    <button
      // key={isDarkMode ? "dark" : "light"} // 使用context在父子间传递值
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4
      focus:outline-none focus:text-blue-600 focus:after:bg-blue-600 dark:focus:text-white dark:focus:after:bg-white
      ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white dark:after:bg-white" : ""}`}
      onClick={() => setActiveTab(name)}
    >
      <span className={getHighlightClass(isActive)}>{icon}</span>
      <span className={getHighlightClass(isActive)}>{name}</span>
    </button>
  )
}

export default ProjectHeader