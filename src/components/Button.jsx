import React from 'react'
import style from './Button.module.css'

function Button({ type, children, onClick}) {
  return (
    <button onClick={onClick} className={`${style.btn} ${style[type]}`}>
        {children}
    </button>
  )
}

export default Button