import { title } from "process"
import { v1 } from "uuid"
import { FilterValuesType, TaskStateType } from "../App"


export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string

}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type AddNewTodoListType = {
    type : 'ADD-TODOLIST',
    data : string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todolistId: string,
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string,
}
type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddNewTodoListType
export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state }
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }

        case 'ADD-TASK': {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todolistId]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let stateCopy = { ...state }
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            let stateCopy = { ...state }
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }

        case 'ADD-TODOLIST' : {
            const stateCopy = {...state}
            stateCopy[v1()] = []
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todolistId, taskId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId }
}

export const addTodoListAC = (data : string) : AddNewTodoListType => {
    return {type : 'ADD-TODOLIST', data : data}
}