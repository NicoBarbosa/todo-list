import { PlusCircle } from 'phosphor-react'
import { Header } from "./components/Header";
import clipboard from './assets/Clipboard.svg'
import style from './App.module.css'
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react';
import uniqid from 'uniqid';

interface TaskPropsApp {
  id: string
  title: string
  isCompleted: boolean
}

export function App() {

  const [tasks, setTasks] = useState([
    {
      id: uniqid(),
      title: 'Estudar Typescript',
      isCompleted: true
    },
    {
      id: uniqid(),
      title: 'Estudar ReactJS',
      isCompleted: true
    },
    {
      id: uniqid(),
      title: 'Estudar NodeJS',
      isCompleted: false
    },
    {
      id: uniqid(),
      title: 'Estudar NextJS',
      isCompleted: false
    },
  ] as TaskPropsApp[])

  const [newTask, setNewTask] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, {
      id: uniqid(),
      title: newTask,
      isCompleted: false
    }])

    setNewTask('')
  }

  function handleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function deleteTask(deletedTask: string) {
    const newListOfTasks = tasks.filter(task => {
      return task.id !== deletedTask
    })

    setTasks(newListOfTasks)

  }

  function changeTask(id: string) {

    const taskChecked = tasks.map(task => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted
      }
      
      return task
    })

    setTasks(taskChecked)
  }
  
  const sumOfTasksCompleted = tasks.filter(task => task.isCompleted)

  const emptyInputTask = newTask.length === 0

  return (
    <div>
      <Header />

      <main className={style.main}>
        <form 
          onSubmit={handleCreateNewTask} 
          className={style.formTasks}>
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa"
            onChange={handleTaskChange}
            required
            value={newTask}
          />
          <button type="submit" disabled={emptyInputTask}>
            Criar
            <PlusCircle size={16} weight="bold"/>
          </button>
        </form>

        <div className={style.progressBar}>
          <div className={style.tasksCreated}>
            <strong>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>

          <div className={style.tasksCompleted}>
            <strong>Concluídas</strong>
            {
              tasks.length !== 0 ?
              <span>
                {sumOfTasksCompleted.length} de {tasks.length}
              </span> :
              <span>
                {tasks.length}
              </span>
            }
            
          </div>
        </div>
        
        {
          tasks.length !== 0 ?
            tasks.map(task => {
              return (
                <Task 
                  key={task.id} 
                  id={task.id}
                  content={task.title}
                  isCompleted={task.isCompleted}
                  onDeletedTask={deleteTask}
                  onChangeTask={changeTask}
                />
              )
            })
          :
          <div className={style.emptyTasks}>
            <img src={clipboard} alt="Clipboard icon" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        }
        
      </main>
    </div>
  )
}

