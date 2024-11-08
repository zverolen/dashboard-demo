import { useCallback, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from './app/hooks'

import ToolBar from './components/toolBar/ToolBar'

import { HubConnectionState } from 'redux-signalr'
import { connection } from './utilities/signalr'
import { countSeconds } from './features/time/timeSlice'

let connected = false

function App() {
  const location = useLocation()
  const isRoot = location.pathname === '/'
  
  const dispatch = useAppDispatch()

  const connectToServer = useCallback(() => {
    if (connection.state !== HubConnectionState.Connected) {
      connection
        .start()
        .then(() => {
          connection.send('GetLiveRaces')
        })
    }
  }, [])

  useEffect(()=> {
    const interval = setInterval(()=> {
      dispatch(countSeconds())
    }, 1000)
    return () => clearInterval(interval)
  })
  
  if (!connected) {
    connected = true
    connectToServer()
  }

  return (
    <>
      <Outlet />
      <ToolBar isRoot={isRoot} />
    </>
  )
}

export default App
