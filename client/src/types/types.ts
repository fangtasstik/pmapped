import { Status, Priority } from "./enums"

export interface Project {
  id: number
  name: string
  description?: string
  startDate?: string
  endDate?: string
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number
  title: string
  description?: string
  status?: Status
  priority?: Priority
  tags?: string
  startDate?: string
  dueDate?: string
  points?: number
  projectId: number
  authorUserId?: number
  assignedUserId?: number
  // include columns
  author?: User
  assignee?: User
  comments?: Comment[]
  attachments?: Attachment[]
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}
