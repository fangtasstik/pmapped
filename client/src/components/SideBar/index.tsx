"use client"

import { useAppDispatch, useAppSelector } from "@/app/redux";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  ShieldAlert,
  Settings,
  Search,
  User,
  Users,
  X,
  ChevronDown,
} from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";

const SideBar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sideBarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black bg-white 
  ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sideBarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* Top Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-1 pt-1 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            <Image src="/triarc_logo.svg" alt="Logo" width={200} height={40} />
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3 pr-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-8 w-8 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        <div className="flex-1 scrollable-content dark:scrollable-content-dark">
          {/* Team */}
          <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <div>
              <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                EDROH TEAM
              </h3>
              <div className="mt-1 flex items-start gap-2">
                <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                <p className="text-xs text-gray-500">Private</p>
              </div>
            </div>
          </div>
          {/* NavBar Links */}
          <nav className="z-10 w-full">
            <SideBarLink icon={Home} label="Home" href="/" />
            <SideBarLink icon={Briefcase} label="Timeline" href="/timeline" />
            <SideBarLink icon={Search} label="Search" href="/search" />
            <SideBarLink icon={Settings} label="Settings" href="/settings" />
            <SideBarLink icon={User} label="Users" href="/users" />
            <SideBarLink icon={Users} label="Teams" href="/teams" />
          </nav>
          {/* Projects Links */}
          <button
            onClick={() => setShowProjects((prev) => !prev)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          >
            <span className="">Projects</span>
            {showProjects ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {/* Projects List */}
          {showProjects && projects?.map((project) => (
            <SideBarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}
          {/* Priorities Links */}
          <button
            onClick={() => setShowPriority((prev) => !prev)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          >
            <span className="">Priority</span>
            {showPriority ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {showPriority && (
            <>
              <SideBarLink icon={AlertCircle} label="Urgent" href="/priority/urgent" colorClass="bg-red-300" />
              <SideBarLink icon={ShieldAlert} label="High" href="/priority/high" colorClass="bg-yellow-300" />
              <SideBarLink icon={AlertTriangle} label="Medium" href="/priority/medium" colorClass="bg-green-300" />
              <SideBarLink icon={AlertOctagon} label="Low" href="/priority/low" colorClass="bg-blue-300" />
              <SideBarLink icon={Layers3} label="Backlog" href="/priority/backlog" colorClass="bg-gray-300" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

interface SideBarLinkProps {
  href: string
  icon: LucideIcon
  label: string
  colorClass?: string
}

const SideBarLink = ({
  href,
  icon: Icon,
  label,
  colorClass,
}: SideBarLinkProps) => {
  const pathName = usePathname()
  const isActive = pathName === href || (pathName === "/" && href === "/dashboard")

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
          } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
          {colorClass && (
            <span
              className={`inline-block h-3 w-3 rounded-sm ml-2 ${colorClass}`}
            ></span>
          )}
        </span>
      </div>
    </Link>
  );
}

export default SideBar