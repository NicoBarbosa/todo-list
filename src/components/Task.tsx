import { Trash } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import styles from './Task.module.css'

interface TaskProps {
  id: string
  content: string
  isCompleted: boolean
  onDeletedTask: (task: string) => void
  onChangeTask: (id: string) => void
}

export function Task({id, content, isCompleted, onChangeTask, onDeletedTask}: TaskProps) {

  function handleDeleteTask() {
    onDeletedTask(id)
  }

  function handleCompletedTask() {
    onChangeTask(id)
  }

  return (
    <div className={styles.Task}>
        <div className={styles.checkboxContainer}>
          <input 
            id={id} 
            checked={isCompleted}
            onChange={handleCompletedTask} 
            type="checkbox" 
          />
          <label htmlFor={id}></label>
        </div>
        {
          <p 
            className={
              isCompleted ? 
              styles.lineTaskCompleted : 
              styles.p
            }
          >
            {content}
          </p>
        }
        <button onClick={handleDeleteTask}>
          <Trash size={20}/>
        </button>
      </div>
  )
}