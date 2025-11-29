import React from 'react'
import { BrowserRouter } from "react-router-dom"
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Task Game App</h1>

        {/* Routing */}
        <AppRoutes />


      </div>
    </BrowserRouter>
  )
}

export default App