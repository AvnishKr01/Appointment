import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext.jsx'
import { DoctorProvider } from './context/DoctorContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <AdminProvider>
      <DoctorProvider>
        <AppProvider>
      <BrowserRouter>
          <App />
  </BrowserRouter>
        </AppProvider>
      </DoctorProvider>
    </AdminProvider>
)
