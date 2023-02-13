import logoToDo from '../assets/todo-logo.svg'

import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.logoBar}>
      <img src={logoToDo} alt="Logo ToDo List" />
    </header>
  )
}