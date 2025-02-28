import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoutingTest from './RoutingTest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/routing-test" element={<RoutingTest message = "Szia te skibidi" />}/>
      <Route index path="/" element={<App message = "Gyatt"/>}/>
    </Routes>
    </BrowserRouter>


  </StrictMode>,
)
