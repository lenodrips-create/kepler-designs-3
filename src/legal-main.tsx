import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LegalPage, { type LegalPageKey } from './pages/legal.tsx'

const root = document.getElementById('root')!
const page = (root.dataset.page === 'terms' ? 'terms' : 'privacy') as LegalPageKey

createRoot(root).render(
  <StrictMode>
    <LegalPage page={page} />
  </StrictMode>,
)
