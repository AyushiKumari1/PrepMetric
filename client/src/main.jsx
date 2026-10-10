import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'

// Apply the saved theme before React mounts to avoid a flash on reload.
try {
  const savedTheme = localStorage.getItem('prepmetric-theme')
  const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  document.documentElement.dataset.resumeTheme = initialTheme
  document.documentElement.style.colorScheme = initialTheme
} catch {
  document.documentElement.dataset.resumeTheme = 'dark'
  document.documentElement.style.colorScheme = 'dark'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
