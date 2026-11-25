import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ClientsPage from './pages/clients.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientsPage />
  </StrictMode>,
)
