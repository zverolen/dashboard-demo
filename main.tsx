import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from 'react-router-dom'

import { store } from './app/store.ts'

import App from './App.tsx'
import RacesList from './features/races/RacesList.tsx'
import './index.css'
import PositionsList from './features/positions/PositionsList.tsx'
import SessionsList from './features/sessions/sessionsList.tsx'
import FormEditRace from './components/formEditRace/FormEditRace.tsx'
import FormMyTeam from './components/formMyTeam/FormMyTeam.tsx'
import FormAddEvent from './components/formAddEvent/FormAddEvent.tsx'
import FormEditSession from './components/formEditSession/FormEditSession.tsx'
import RaceStatsList from './components/raceStatsList/raceStatsList.tsx'
import Sessions from './components/sessions/Sessions.tsx'
import Form from './components/form/Form.tsx'

const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={ <App/> }>
    <Route index element={ <RacesList />} />
    <Route path=":raceId" element={<PositionsList />} />

    <Route path=":raceId/:teamNumber" element={ <Sessions /> }>
      <Route path="sessions" element={ <SessionsList /> } />

      <Route path="sessions/:sessionNumber" element={ <Form /> }>
        <Route path=":lapNumber/addevent" element={ <FormAddEvent /> } />
        <Route path="editsession" element={ <FormEditSession /> } />
      </Route>
        
    </Route>
    
    <Route path=":raceId/editrace" element={ <FormEditRace /> } />
    <Route path=":raceId/myteam" element={ <FormMyTeam /> } />
    <Route path=":raceId/racestats" element={ <RaceStatsList /> } />
    
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
