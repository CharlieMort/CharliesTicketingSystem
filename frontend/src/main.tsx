import { createRoot } from 'react-dom/client'
import "98.css"
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/page/' element={<App />} />
    </Routes>
  </BrowserRouter>,
)
