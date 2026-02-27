import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { LoaderProvider } from './contexts/LoaderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoaderProvider>
  </StrictMode>,
)
