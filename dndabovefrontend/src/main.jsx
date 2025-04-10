import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CreatorProvider, ExtraFeatProvider } from "./assets/BringStatChoice.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatorPage from './CreatorPage.jsx'
import CreationOptionsPage from './CreationOptionsPage.jsx'
import CollectedDataTest from './CollectedDataTest.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './assets/Header.jsx'
import Home from './Home.jsx'
import { EquipmentProvider, RemainingGoldProvider } from './assets/SaveContexts/EquipmentContext.jsx';
import { RaceIdProvider, SubraceIdProvider } from './assets/SaveContexts/RaceContext.jsx';
import { ClassIdProvider, SubclassIdProvider, ChosenClassFeatureIdProvider } from './assets/SaveContexts/ClassContext.jsx';
import { BgNameProvider, BgDescProvider, BgSkillsProvider, BgToolProvider } from './assets/SaveContexts/BackgroundContext.jsx';
import { FinalSpellsProvider } from './assets/SaveContexts/FinalSpellContext.jsx';
import SignInPage from './assets/UserManagementPages/SignInPage.jsx'
import SignUpPage from './assets/UserManagementPages/SignUpPage.jsx'
import { StatsProvider } from './assets/SaveContexts/StatContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Header />
      <CreatorProvider>
      <ExtraFeatProvider>

      <EquipmentProvider>
      <RemainingGoldProvider>

      <RaceIdProvider>
      <SubraceIdProvider>

      <ClassIdProvider>
      <SubclassIdProvider>
      <ChosenClassFeatureIdProvider>

      <BgNameProvider>
      <BgDescProvider>
      <BgSkillsProvider>
      <BgToolProvider>

      <FinalSpellsProvider>

      <StatsProvider>
              <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/creator-options" element={<CreationOptionsPage />} />
                <Route path="/character-creator" element={<CreatorPage />} />  
                <Route path="/finalize" element={<CollectedDataTest/>}/>
                <Route path="/sign-in" element={<SignInPage/>}/>
                <Route path="/sign-up" element={<SignUpPage/>}/>
              </Routes>
      </StatsProvider>

      </FinalSpellsProvider>

      </BgToolProvider>
      </BgSkillsProvider>
      </BgDescProvider>      
      </BgNameProvider>

      </ChosenClassFeatureIdProvider>
      </SubclassIdProvider>
      </ClassIdProvider>

      </SubraceIdProvider>
      </RaceIdProvider>      
            
      </RemainingGoldProvider>
      </EquipmentProvider>

      </ExtraFeatProvider>
      </CreatorProvider>
    </BrowserRouter>

)
