import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Context from './Context/Context'
import router from './Utils/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
      <RouterProvider router={router}>
      </RouterProvider>
    </Context>
  </StrictMode>,
)
