import React from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster } from "@/components/ui/toaster"

import { AppProvider } from '@/providers/index.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <Toaster />
      <App />
    </AppProvider>
  </React.StrictMode>,
)
