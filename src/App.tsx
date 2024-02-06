import { useState } from 'react';
import { TodoList } from './TodoList';
import { TaskType } from './TodoList';
import { v1 } from 'uuid';
import './App.css';
import AddItemForm from './AddItemForm';
import { AppBar, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';
import { Button } from '@mui/base';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();
  let [todolists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: 'active' },
    { id: todolistId2, title: "What to By", filter: 'completed' },
  ])

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JavaScript", isDone: true },
      { id: v1(), title: "React", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "books", isDone: true },
      { id: v1(), title: "milk", isDone: true },
    ]

  })

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let taskss = tasksObj[todolistId]
    let task = taskss.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }

  }


  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let taskss = tasksObj[todolistId]
    let task = taskss.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj })
    }

  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todolist = todolists.find((tl) => tl.id === todoListId);

    if (todolist) {
      todolist.filter = value
      setTodoLists([...todolists])
    }
  }

  function removeTask(id: string, todolistId: string) {
    let task = tasksObj[todolistId]
    let resultTasks = task.filter((t) => t.id !== id);
    tasksObj[todolistId] = resultTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let task = tasksObj[todolistId]
    let newTasks = [newTask, ...task]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function removeTodoList(id: string) {
    let filteredTodolist = todolists.filter((tl) => tl.id !== id);
    setTodoLists(filteredTodolist)
    delete tasksObj[id]
    setTasks({ ...tasksObj })
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    const todolist = todolists.find((tl) => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodoLists([...todolists])
    }
  }


  function addTodoList(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodoLists([todolist, ...todolists])
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }


  return (
    <div className="App">
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton edge={'start'} color={'inherit'} aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>
            news
          </Typography>
          <Button color={'inherit'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container spacing={3} style={{padding : "30px"}}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        {
          todolists.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id];
            if (tl.filter === 'completed') {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true)
            }
            if (tl.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false)
            }

            return (<Grid item>
              <Paper style={{padding : "10px", margin : "30px"}}>
                <TodoList
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTasksStatus={changeStatus}
                  changeTasksTitle={changeTaskTitle}
                  filter={tl.filter}
                  removeTodoList={removeTodoList}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
            )
          })
        }
      </Container>
    </div>
  );
}

export default App;
