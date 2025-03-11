import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoutingTest from './RoutingTest.jsx'
import CreatorPage from './CreatorPage.jsx'
import CreationOptionsPage from './CreationOptionsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/routing-test" element={<RoutingTest message = "Szia te skibidi" />}/>
      {/*<Route index path="/" element={<App message = "Gyatt"/>}/>*/}
      <Route index path="/" element={<CreatorPage/>}/>
    </Routes>
    </BrowserRouter>


  </StrictMode>,
)
