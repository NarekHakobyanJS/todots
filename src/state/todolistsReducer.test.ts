import { addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, removeTodolistAC, todoListsReducer } from "./todolistsReducer";
import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";

test('coorect todoList should be removed', ( ) => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState : Array<TodoListType> = [
        {id : todoListId1, title : "what to learn", filter : 'all'},
        {id : todoListId2, title : "what to learn", filter : 'all'},
    ]

    const endState = todoListsReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', ( ) => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "new Todo"
    const startState : Array<TodoListType> = [
        {id : todoListId1, title : "what to learn", filter : 'all'},
        {id : todoListId2, title : "what to learn", filter : 'all'},
    ]

    const endState = todoListsReducer(startState, addTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('all')
})

test('coorect todoList should cahnge its name', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "new Todo"
    const startState : Array<TodoListType> = [
        {id : todoListId1, title : "what to learn", filter : 'all'},
        {id : todoListId2, title : "what to by", filter : 'all'},
    ]

    const endState = todoListsReducer(startState, changeTodolistTitleAC(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe("what to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist shoult be changed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newFilter : FilterValuesType = "completed"

    const startState : Array<TodoListType> = [
        {id : todoListId1, title : "what to learn", filter : 'all'},
        {id : todoListId2, title : "what to by", filter : 'all'},
    ]

    const  endState = todoListsReducer(startState, changeTodolistFilterAC(todoListId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

