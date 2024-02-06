import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { FilterValuesType } from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { IconButton, Button, Checkbox } from '@mui/material'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todoListId: string) => void,
    addTask: (title: string, todolistId: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTasksTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType,
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}


export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onACtiveClickHandler = () => props.changeFilter("active", props.id)
    const onComplitedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton aria-label='delete' onClick={removeTodoList}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
            />

            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => { props.removeTask(t.id, props.id) }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTasksStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTasksTitle(t.id, newValue, props.id)
                        }
                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTitleHandler}
                                />

                                <IconButton aria-label='delete' onClick={onRemoveHandler}>
                                    <DeleteIcon />
                                </IconButton>

                            </div>
                        )
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === "all" ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.filter === "active" ? 'contained' : 'text'} onClick={onACtiveClickHandler}>Active</Button>
                <Button color={'secondary'} variant={props.filter === "completed" ? 'contained' : 'text'} onClick={onComplitedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}
