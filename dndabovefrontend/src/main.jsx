import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoutingTest from './RoutingTest.jsx'
import CreatorPage from './CreatorPage.jsx'
import CreationOptionsPage from './CreationOptionsPage.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './assets/Header.jsx'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator-options" element={<CreationOptionsPage />} />
        <Route path="/character-creator" element={<CreatorPage />} />
      </Routes>
    </BrowserRouter>


  </StrictMode>,
)
