import { tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, addTodoListAC } from "./tasksReducer";
import { TaskStateType } from "../App";

test('correct task should be deleted from correct array', () => {
    const startState : TaskStateType = {
        'todolistId1': [
          { id: '1', title: "HTML&CSS", isDone: true },
          { id: '2', title: "JavaScript", isDone: true },
          { id: '3', title: "React", isDone: false },
        ],
        'todolistId2': [
          { id: '1', title: "books", isDone: true },
          { id: '2', title: "milk", isDone: true },
          { id: '3', title: "milk", isDone: true },
        ]
    
      }

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to carrect array', () => {
   
    const startState : TaskStateType = {
        'todolistId1': [
          { id: '1', title: "HTML&CSS", isDone: true },
          { id: '2', title: "JavaScript", isDone: true },
          { id: '3', title: "React", isDone: false },
        ],
        'todolistId2': [
          { id: '1', title: "books", isDone: true },
          { id: '2', title: "milk", isDone: true },
          { id: '3', title: "milk", isDone: true },
        ]
    
      }
     
    const action = addTaskAC('juice', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of spacing tasks, should be changed', () => {
  const startState : TaskStateType = {
    'todolistId1': [
      { id: '1', title: "HTML&CSS", isDone: true },
      { id: '2', title: "JavaScript", isDone: true },
      { id: '3', title: "React", isDone: false },
    ],
    'todolistId2': [
      { id: '1', title: "books", isDone: true },
      { id: '2', title: "milk", isDone: true },
      { id: '3', title: "milk", isDone: true },
    ]

  }

  const action = changeTaskStatusAC('2', false, 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].isDone).toBe(false)
  expect(endState['todolistId2'][1].isDone).toBe(false)
})

test('title of spacing tasks, should be changed', () => {
  const startState : TaskStateType = {
    'todolistId1': [
      { id: '1', title: "HTML&CSS", isDone: true },
      { id: '2', title: "milk", isDone: true },
      { id: '3', title: "React", isDone: false },
    ],
    'todolistId2': [
      { id: '1', title: "books", isDone: true },
      { id: '2', title: "Jav", isDone: true },
      { id: '3', title: "milk", isDone: true },
    ]

  }

  const action = changeTaskTitleAC('1', 'JavaScript', 'todolistId2')

  const endState = tasksReducer(startState, action)

  // expect(endState['todolistId1'][1].title).toBe('milk')
  // expect(endState['todolistId2'][2].title).toBe("JavaScript")
})

test('new array should be added when todolist is added', () => {
   const startState : TaskStateType = {
    'todolistId1': [
      { id: '1', title: "HTML&CSS", isDone: true },
      { id: '2', title: "milk", isDone: true },
      { id: '3', title: "React", isDone: false },
    ],
    'todolistId2': [
      { id: '1', title: "books", isDone: true },
      { id: '2', title: "Jav", isDone: true },
      { id: '3', title: "milk", isDone: true },
    ]

  }

  const action =  addTodoListAC('add todo')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
  if(!newKey) {
    throw new Error("new key sholud be added");
    
  }
  expect(keys.length).toBe(3)
})