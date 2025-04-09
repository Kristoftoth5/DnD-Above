import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CreatorProvider } from "./assets/BringStatChoice.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatorPage from './CreatorPage.jsx'
import CreationOptionsPage from './CreationOptionsPage.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './assets/Header.jsx'
import Home from './Home.jsx'
import { EquipmentProvider, RemainingGoldProvider } from './assets/SaveContexts/EquipmentContext.jsx';
import { RaceIdProvider, SubraceIdProvider } from './assets/SaveContexts/RaceContext.jsx';
import { ClassIdProvider, SubclassIdProvider, ChosenClassFeatureIdProvider } from './assets/SaveContexts/ClassContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Header />
      <CreatorProvider>

      <EquipmentProvider>
      <RemainingGoldProvider>

      <RaceIdProvider>
      <SubraceIdProvider>

      <ClassIdProvider>
      <SubclassIdProvider>
      <ChosenClassFeatureIdProvider>
              <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/creator-options" element={<CreationOptionsPage />} />
                <Route path="/character-creator" element={<CreatorPage />} />  
              </Routes>
      </ChosenClassFeatureIdProvider>
      </SubclassIdProvider>
      </ClassIdProvider>

      </SubraceIdProvider>
      </RaceIdProvider>      
            
      </RemainingGoldProvider>
      </EquipmentProvider>

      </CreatorProvider>
    </BrowserRouter>

)
