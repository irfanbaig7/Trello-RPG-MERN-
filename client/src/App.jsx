import React from 'react'
import { BrowserRouter } from "react-router-dom"
import AppRoutes from './routes/AppRoutes'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div>
          <h1 className="text-2xl font-semibold mb-4">Task Game App</h1>

          {/* Routing */}
          <AppRoutes />


        </div>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App