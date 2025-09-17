import { Item } from '@/features/taskModal'

export type BadgePropStatus =
  | 'system'
  | 'normal'
  | 'success'
  | 'warning'
  | 'alert'
  | 'disabled'
  | 'error'

export type TaskStatus = 'toDo' | 'inProgress' | 'done'

type Chip = { label: string; status: BadgePropStatus }

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  chip: Chip
  user?: Item | null
  date: Date
}

export type Column = { id: string; title: string; tasks: Task[] }

export const statusToBadge: Record<TaskStatus, BadgePropStatus> = {
  toDo: 'system',
  inProgress: 'normal',
  done: 'success',
}

export const STATUSES = {
  toDo: {
    id: 'toDo',
    title: 'To Do',
    label: 'To Do',
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    label: 'In Progress',
  },
  done: {
    id: 'done',
    title: 'Done',
    label: 'Done',
  },
}

export const STATUSES_SELECT = [
  { ...STATUSES.toDo },
  { ...STATUSES.inProgress },
  { ...STATUSES.done },
]

export const INITIAL_COLUMNS = JSON.stringify([
  {
    id: STATUSES.toDo.id,
    title: STATUSES.toDo.title,
    tasks: [
      {
        id: '1',
        title: 'Задача 1',
        description: 'Описание задачи',
        date: new Date(),
        status: 'toDo',
        chip: {
          label: 'To do',
          status: statusToBadge['toDo'],
        },
      },
      {
        id: '2',
        title: 'Задача 2',
        description: 'Описание задачи',
        date: new Date(),
        status: 'toDo',
        chip: {
          label: 'To do',
          status: statusToBadge['toDo'],
        },
      },
      {
        id: '3',
        title: 'Задача 3',
        description: 'Описание задачи',
        date: new Date(),
        status: 'toDo',
        chip: {
          label: 'To do',
          status: statusToBadge['toDo'],
        },
      },
    ],
  },
  {
    id: STATUSES.inProgress.id,
    title: STATUSES.inProgress.title,
    tasks: [
      {
        id: '4',
        title: 'Задача 4',
        description: 'Описание задачи',
        date: new Date(),
        status: 'inProgress',
        chip: {
          label: 'In Progress',
          status: statusToBadge['inProgress'],
        },
      },
    ],
  },
  {
    id: STATUSES.done.id,
    title: STATUSES.done.title,
    tasks: [
      {
        id: '5',
        title: 'Задача 5',
        date: new Date(),
        status: 'done',
        chip: {
          label: 'Done',
          status: statusToBadge['done'],
        },
      },
    ],
  },
])

export const USERS = [
  {
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
    id: 1,
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
    id: 2,
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/13190808?v=4',
    id: 3,
  },
]
