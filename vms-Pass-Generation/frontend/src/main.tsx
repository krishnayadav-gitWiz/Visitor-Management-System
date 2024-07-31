import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing.js'
import 'tailwindcss/tailwind.css';
import './styles/styles.css'
import './styles/app.css'
import './styles/index.css'
ReactDOM.createRoot(document.getElementById('root')as HTMLElement).render(
  <React.StrictMode>
    <Routing/>
  </React.StrictMode>
)
