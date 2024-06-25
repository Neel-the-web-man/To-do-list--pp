import React from 'react'
import "./navbar.css"
const navbar = () => {
  return (
    <nav>
        <div className="app-title">
            Todo List
        </div>
        <ul>
            <li>Home</li>
            <li>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default navbar
